const Crop = require('../models/Crop');

// Crop recommendation algorithm based on real parameters
exports.recommendCrops = async (req, res) => {
    try {
        const { soilType, district, temperature, rainfall } = req.body;

        // Validate input
        if (!soilType || !district || !temperature || !rainfall) {
            return res.status(400).json({ 
                error: 'Please provide all parameters: soilType, district, temperature, rainfall' 
            });
        }

        // Get all active crops
        const allCrops = await Crop.find({ status: 'active' });
        
        // Calculate suitability scores for each crop
        const recommendations = allCrops.map(crop => {
            const score = calculateSuitabilityScore(crop, {
                soilType,
                district,
                temperature: parseFloat(temperature),
                rainfall: parseFloat(rainfall)
            });
            
            return {
                ...crop._doc,
                suitabilityScore: score,
                matchPercentage: Math.round(score * 100)
            };
        })
        .filter(crop => crop.suitabilityScore > 0.3) // Only include crops with >30% suitability
        .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
        .slice(0, 6); // Top 6 recommendations

        res.json({
            success: true,
            recommendations,
            parameters: { soilType, district, temperature, rainfall },
            totalRecommendations: recommendations.length
        });

    } catch (error) {
        console.error('Crop recommendation error:', error);
        res.status(500).json({ error: 'Server error in crop recommendation' });
    }
};

// Calculate suitability score (0-1) based on multiple factors
function calculateSuitabilityScore(crop, parameters) {
    let score = 0;
    const weights = {
        soil: 0.3,
        district: 0.2,
        temperature: 0.25,
        rainfall: 0.25
    };

    // 1. Soil type match
    if (crop.soilTypes.includes(parameters.soilType)) {
        score += weights.soil;
    }

    // 2. District match
    if (crop.districts.includes(parameters.district)) {
        score += weights.district;
    }

    // 3. Temperature suitability
    const tempScore = calculateTemperatureScore(crop, parameters.temperature);
    score += tempScore * weights.temperature;

    // 4. Rainfall suitability
    const rainScore = calculateRainfallScore(crop, parameters.rainfall);
    score += rainScore * weights.rainfall;

    return Math.min(score, 1); // Cap at 1
}

function calculateTemperatureScore(crop, currentTemp) {
    if (!crop.minTemperature || !crop.maxTemperature) return 0.5;
    
    const optimalRange = crop.maxTemperature - crop.minTemperature;
    const tempDeviation = Math.max(
        0,
        Math.abs(currentTemp - (crop.minTemperature + crop.maxTemperature) / 2)
    );
    
    // Higher score when temperature is closer to optimal range
    return Math.max(0, 1 - (tempDeviation / optimalRange));
}

function calculateRainfallScore(crop, currentRainfall) {
    if (!crop.minRainfall || !crop.maxRainfall) return 0.5;
    
    const optimalMid = (crop.minRainfall + crop.maxRainfall) / 2;
    const range = crop.maxRainfall - crop.minRainfall;
    
    // Calculate how close rainfall is to optimal range
    const deviation = Math.abs(currentRainfall - optimalMid);
    return Math.max(0, 1 - (deviation / range));
}