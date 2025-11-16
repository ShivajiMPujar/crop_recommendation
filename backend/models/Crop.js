const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nameKannada: String,
    nameHindi: String,
    nameMarathi: String,
    scientificName: String,
    image: String,
    soilTypes: [{
        type: String,
        enum: ['Red Soil', 'Black Soil', 'Alluvial Soil', 'Laterite Soil', 'Sandy Soil', 'Clay Soil']
    }],
    districts: [String],
    minTemperature: Number,
    maxTemperature: Number,
    minRainfall: Number,
    maxRainfall: Number,
    waterNeeds: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    season: {
        type: String,
        enum: ['Kharif', 'Rabi', 'Summer', 'All Season']
    },
    duration: String, // Crop duration in days
    fertilizers: [String],
    yield: String,
    suitabilityScore: Number,
    description: String,
    descriptionKannada: String,
    descriptionHindi: String,
    descriptionMarathi: String,
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);