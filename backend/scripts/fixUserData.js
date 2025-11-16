const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const fixUserData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crop-recommendation', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Find the user "Dev" with email "dev@gmail.com"
    const user = await User.findOne({ email: 'dev@gmail.com' });
    
    if (!user) {
      console.log('User dev@gmail.com not found');
      process.exit(0);
    }

    console.log('Found user:', user);
    console.log('Current data:');
    console.log('  phone:', user.phone);
    console.log('  region:', user.region);
    console.log('  district:', user.district);
    console.log('  soilType:', user.soilType);

    // Update missing fields with default values
    if (!user.phone) user.phone = '9876543210';
    if (!user.region) user.region = 'North Karnataka';
    if (!user.soilType) user.soilType = 'Black Soil';

    await user.save();

    console.log('\nUser updated successfully!');
    console.log('Updated data:');
    console.log('  phone:', user.phone);
    console.log('  region:', user.region);
    console.log('  district:', user.district);
    console.log('  soilType:', user.soilType);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixUserData();
