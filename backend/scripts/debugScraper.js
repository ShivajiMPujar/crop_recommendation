const axios = require('axios');

const URL = 'https://raitamitra.karnataka.gov.in/english';

async function scrape() {
    try {
        console.log(`Fetching ${URL}...`);
        const { data } = await axios.get(URL);

        const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/gi;

        let match;
        let count = 0;

        console.log('\n--- All Links (First 100) ---');
        while ((match = linkRegex.exec(data)) !== null && count < 100) {
            const href = match[2];
            const text = match[3].replace(/<[^>]*>/g, '').trim();

            if (text.length > 0) {
                console.log(`[${count}] ${text} -> ${href}`);
                count++;
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

scrape();
