const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'en',
        enum: ['en', 'kn', 'hi', 'mr']
    },
    soilType: {
        type: String
    },
    role: {
        type: String,
        default: 'farmer',
        enum: ['farmer', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);