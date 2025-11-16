const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
    varietyName: {
        type: String,
        required: true
    },
    varietyNameKannada: String,
    cropName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Hybrid', 'Traditional', 'High Yield', 'Disease Resistant', 'Drought Tolerant']
    },
    suitableRegions: [String],
    suitableDistricts: [String],
    brand: String,
    supplier: String,
    image: String,
    pricePerKg: Number,
    germinationRate: String,
    duration: String,
    specialFeatures: [String],
    contact: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    reviews: [{
        user: String,
        rating: Number,
        comment: String,
        date: Date
    }],
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Seed', seedSchema);