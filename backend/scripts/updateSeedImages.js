const mongoose = require('mongoose');
require('dotenv').config();
const Seed = require('../models/Seed');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';

const fallbackImages = {
  ragi: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop',
  groundnut: 'https://images.unsplash.com/photo-1626618010644-2fc20c8c8c0b?w=400&h=300&fit=crop',
  cotton: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop',
  paddy: 'https://images.unsplash.com/photo-1563227816-63b3a5d4abb4?w=400&h=300&fit=crop',
  chilli: 'https://images.unsplash.com/photo-1543224289-1b97b9997f3b?w=400&h=300&fit=crop',
  sunflower: 'https://images.unsplash.com/photo-1597848212624-e5d0e4532390?w=400&h=300&fit=crop',
  jowar: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&h=300&fit=crop',
  maize: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&h=300&fit=crop',
  sugarcane: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=400&h=300&fit=crop',
  default: 'https://via.placeholder.com/400x300?text=Seed+Image'
};

function chooseImage(seed) {
  const crop = (seed.cropName || '').toLowerCase();
  for (const key of Object.keys(fallbackImages)) {
    if (crop.includes(key)) return fallbackImages[key];
  }
  // try varietyName
  const variety = (seed.varietyName || '').toLowerCase();
  for (const key of Object.keys(fallbackImages)) {
    if (variety.includes(key)) return fallbackImages[key];
  }
  return fallbackImages.default;
}

async function update() {
  try {
    await mongoose.connect(MONGODB_URI);
    const seeds = await Seed.find();
    let updated = 0;
    for (const seed of seeds) {
      if (!seed.image || seed.image.startsWith('/')) {
        const newImage = chooseImage(seed);
        seed.image = newImage;
        await seed.save();
        updated++;
        console.log(`Updated ${seed.varietyName} -> ${newImage}`);
      }
    }
    console.log(`\nDone. Updated ${updated} seeds.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

update();
