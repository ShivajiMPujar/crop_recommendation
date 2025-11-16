const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nameKannada: String,
    type: {
        type: String,
        enum: ['KSSCL Depot', 'Krishi Vikas Kendra', 'Private Dealer', 'Cooperative Society']
    },
    address: String,
    district: {
        type: String,
        required: true
    },
    taluk: String,
    contact: String,
    email: String,
    availableSeeds: [String],
    availableCrops: [String],
    products: [String],
    timing: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    image: String,
    rating: Number,
    reviews: Number,
    deliveryAvailable: {
        type: Boolean,
        default: false
    },
    governmentApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);