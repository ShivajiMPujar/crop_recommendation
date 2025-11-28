const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    skills: [{
        type: String,
        enum: ['Harvesting', 'Sowing', 'Weeding', 'Spraying', 'Irrigation', 'Tractor Operation', 'General Labour']
    }],
    dailyRate: {
        type: Number,
        required: true,
        min: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        maxLength: 500
    },
    availability: {
        type: String,
        enum: ['Available', 'Busy', 'Seasonal'],
        default: 'Available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WorkerProfile', workerProfileSchema);
