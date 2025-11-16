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

        // Insert store data (use unordered inserts so valid stores still get created)
        try {
            const insertedStores = await Store.insertMany(storeData, { ordered: false });
            console.log(`✅ Inserted ${insertedStores.length} stores`);
        } catch (storeErr) {
            // If some documents failed validation, ordered:false still throws; try to extract how many inserted
            if (storeErr && storeErr.result && typeof storeErr.result.nInserted === 'number') {
                console.log(`⚠️ Inserted ${storeErr.result.nInserted} stores; some entries failed validation.`);
            } else if (storeErr && storeErr.insertedDocs && Array.isArray(storeErr.insertedDocs)) {
                console.log(`⚠️ Inserted ${storeErr.insertedDocs.length} stores; some entries failed validation.`);
            } else {
                console.log('⚠️ Some stores failed to insert. See errors below:');
            }
            console.error(storeErr && storeErr.writeErrors ? storeErr.writeErrors.map(e => e.errmsg || e.toString()) : storeErr);
        }

        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seedDatabase();