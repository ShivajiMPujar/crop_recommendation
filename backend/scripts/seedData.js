const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Crop = require('../models/Crop');
const Seed = require('../models/Seed');
const Store = require('../models/Store');

// Data
const cropData = require('../data/cropData');
const seedData = require('../data/seedData');
const storeData = require('../data/storeData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Crop.deleteMany({});
        await Seed.deleteMany({});
        await Store.deleteMany({});
        console.log('✅ Cleared existing data');

        // Insert crop data
        await Crop.insertMany(cropData);
        console.log(`✅ Inserted ${cropData.length} crops`);

        // Insert seed data
        await Seed.insertMany(seedData);
        console.log(`✅ Inserted ${seedData.length} seed varieties`);

        // Insert store data
        let successfulStores = [];
        let failedStores = [];
        
        for (let i = 0; i < storeData.length; i++) {
            try {
                const insertedStore = await Store.create(storeData[i]);
                successfulStores.push(insertedStore.name);
            } catch (err) {
                failedStores.push({
                    name: storeData[i].name,
                    error: err.message
                });
            }
        }
        
        console.log(`✅ Inserted ${successfulStores.length} stores`);
        
        if (failedStores.length > 0) {
            console.log(`\n⚠️ ${failedStores.length} stores failed to insert:`);
            failedStores.forEach(store => {
                console.log(`  ❌ ${store.name}`);
                console.log(`     Error: ${store.error}`);
            });
            console.log();
        }

        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seedDatabase();