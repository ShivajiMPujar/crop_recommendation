const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';

async function seedTestUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('✅ Cleared existing users');

        // Hash passwords
        const farmerPassword = await bcrypt.hash('password123', 10);
        const adminPassword = await bcrypt.hash('admin123', 10);

        // Create test users
        const testUsers = [
            {
                name: 'Test Farmer',
                email: 'farmer@example.com',
                password: farmerPassword,
                phone: '9876543210',
                region: 'Northern',
                district: 'Bangalore Urban',
                language: 'en',
                soilType: 'Black Soil',
                role: 'farmer'
            },
            {
                name: 'Test Admin',
                email: 'admin@example.com',
                password: adminPassword,
                phone: '9123456789',
                region: 'Southern',
                district: 'Mysore',
                language: 'en',
                soilType: 'Red Soil',
                role: 'admin'
            }
        ];

        const insertedUsers = await User.insertMany(testUsers);
        console.log(`✅ Created ${insertedUsers.length} test users`);
        console.log('\n📋 Test Credentials:');
        console.log('Farmer:');
        console.log('  Email: farmer@example.com');
        console.log('  Password: password123\n');
        console.log('Admin:');
        console.log('  Email: admin@example.com');
        console.log('  Password: admin123\n');

        console.log('🎉 Test users created successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seedTestUsers();
