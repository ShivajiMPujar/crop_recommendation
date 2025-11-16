const mongoose = require('mongoose');
require('dotenv').config();

const Crop = require('../models/Crop');
const Seed = require('../models/Seed');
const Store = require('../models/Store');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';

async function checkData() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB:', MONGODB_URI);

    const cropCount = await Crop.countDocuments();
    const seedCount = await Seed.countDocuments();
    const storeCount = await Store.countDocuments();

    console.log(`Crops: ${cropCount}`);
    console.log(`Seeds: ${seedCount}`);
    console.log(`Stores: ${storeCount}`);

    if (storeCount > 0) {
      const sampleStores = await Store.find().limit(5).lean();
      console.log('\nSample stores (up to 5):');
      sampleStores.forEach((s, i) => {
        console.log(`#${i+1} - ${s.name} (${s.type}) - ${s.district}`);
      });
    } else {
      console.log('\nNo stores found in the `stores` collection.');
    }

    if (seedCount > 0) {
      const sampleSeeds = await Seed.find().limit(5).lean();
      console.log('\nSample seeds (up to 5):');
      sampleSeeds.forEach((s, i) => {
        console.log(`#${i+1} - ${s.varietyName} (${s.type}) - ${s.cropName}`);
      });
    } else {
      console.log('\nNo seeds found in the `seeds` collection.');
    }

    if (cropCount > 0) {
      const sampleCrops = await Crop.find().limit(3).lean();
      console.log('\nSample crops (up to 3):');
      sampleCrops.forEach((c, i) => console.log(`#${i+1} - ${c.name}`));
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error checking data:', err);
    process.exit(1);
  }
}

checkData();
