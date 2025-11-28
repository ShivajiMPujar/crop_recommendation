const axios = require('axios');
const cheerio = require('cheerio');

// Fallback data in case scraping fails
const MOCK_SCHEMES = [
    {
        id: "mock-1",
        title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        shortDescription: "A crop insurance scheme that provides financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
        link: "https://pmfby.gov.in/",
        publishedDate: new Date().toISOString(),
        type: "Insurance"
    },
    {
        id: "mock-2",
        title: "PM Kisan Samman Nidhi",
        shortDescription: "Income support of Rs. 6000/- per year to all land holding farmer families across the country.",
        link: "https://pmkisan.gov.in/",
        publishedDate: new Date().toISOString(),
        type: "Financial Support"
    },
    {
        id: "mock-3",
        title: "Soil Health Card Scheme",
        shortDescription: "Issuance of Soil Health Cards to farmers to provide information on nutrient status of their soil.",
        link: "https://soilhealth.dac.gov.in/",
        publishedDate: new Date().toISOString(),
        type: "Advisory"
    },
    {
        id: "mock-4",
        title: "Krishi Bhagya Scheme",
        shortDescription: "To improve rainfed agriculture scenario with the efficient management of rain water and enhancing the farm productivity.",
        link: "https://raitamitra.karnataka.gov.in/",
        publishedDate: new Date().toISOString(),
        type: "State Scheme"
    }
];

const TARGET_URL = 'https://raitamitra.karnataka.gov.in/english';

// Cache to avoid hitting the government server too often
let schemeCache = {
    data: null,
    lastFetch: 0,
    ttl: 1000 * 60 * 60 // 1 hour cache
};

exports.getSchemes = async (req, res) => {
    try {
        // Check cache first
        const now = Date.now();
        if (schemeCache.data && (now - schemeCache.lastFetch < schemeCache.ttl)) {
            console.log("Serving schemes from cache");
            return res.json(schemeCache.data);
        }

        console.log(`Scraping ${TARGET_URL}...`);

        // Use a real user agent to avoid being blocked
        const { data } = await axios.get(TARGET_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const schemes = [];
        let idCounter = 1;

        // Strategy 1: Look for specific sections or lists
        // This is generic scraping logic based on common patterns
        $('a').each((i, el) => {
            const link = $(el);
            const href = link.attr('href');
            let text = link.text().trim();

            // Clean up text
            text = text.replace(/\s+/g, ' ');

            if (text && href && text.length > 10) {
                const lowerText = text.toLowerCase();
                // Filter for relevant keywords
                if (lowerText.includes('scheme') ||
                    lowerText.includes('yojana') ||
                    lowerText.includes('program') ||
                    lowerText.includes('benefit') ||
                    lowerText.includes('subsidy') ||
                    lowerText.includes('krishi') ||
                    lowerText.includes('farmer')) {

                    let fullLink = href;
                    if (!href.startsWith('http')) {
                        // Handle relative URLs correctly
                        if (href.startsWith('/')) {
                            fullLink = `https://raitamitra.karnataka.gov.in${href}`;
                        } else {
                            fullLink = `https://raitamitra.karnataka.gov.in/${href}`;
                        }
                    }

                    // Avoid duplicates in this run
                    if (!schemes.some(s => s.title === text)) {
                        schemes.push({
                            id: `scraped-${idCounter++}`,
                            title: text,
                            shortDescription: "Click to view details on the official government website.",
                            link: fullLink,
                            publishedDate: new Date().toISOString(),
                            type: "Government Scheme"
                        });
                    }
                }
            }
        });

        // If we found schemes, update cache and return
        if (schemes.length > 0) {
            console.log(`Found ${schemes.length} schemes via scraping.`);
            schemeCache = {
                data: schemes,
                lastFetch: now,
                ttl: 1000 * 60 * 60
            };
            return res.json(schemes);
        }

        console.log("No schemes found via scraping, returning mock data.");
        // Update cache with mock data to avoid repeated failed scrapes
        schemeCache = {
            data: MOCK_SCHEMES,
            lastFetch: now,
            ttl: 1000 * 60 * 5 // Short cache for failures
        };
        return res.json(MOCK_SCHEMES);

    } catch (error) {
        console.error('Scraping failed:', error.message);
        // Fallback to mock data on error
        res.json(MOCK_SCHEMES);
    }
};

exports.getLatestSchemes = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        // Check cache first
        if (schemeCache.data) {
            return res.json(schemeCache.data.slice(0, limit));
        }

        // If no cache, return mock data immediately to avoid delay on homepage
        // Ideally we should trigger a scrape here if cache is empty, but for responsiveness we return mock
        res.json(MOCK_SCHEMES.slice(0, limit));

    } catch (error) {
        console.error('Scraping latest failed:', error.message);
        const limit = parseInt(req.query.limit) || 4;
        res.json(MOCK_SCHEMES.slice(0, limit));
    }
};
