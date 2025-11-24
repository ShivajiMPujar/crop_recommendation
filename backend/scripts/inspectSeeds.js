const mongoose = require('mongoose');
require('dotenv').config();
const Seed = require('../models/Seed');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';

async function inspect() {
  try {
    await mongoose.connect(MONGODB_URI);
    const seeds = await Seed.find().lean();
    console.log(`Found ${seeds.length} seeds\n`);
    seeds.forEach((s, i) => {
      console.log(`${i+1}. ${s.varietyName} - crop: ${s.cropName}`);
      console.log(`   image: ${s.image || 'NO IMAGE'}`);
      console.log(`   suitableDistricts: ${JSON.stringify(s.suitableDistricts)}`);
      console.log('');
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
inspect();
