const mongoose = require('mongoose');
const WorkerProfile = require('../models/WorkerProfile');
const User = require('../models/User');
require('dotenv').config();

const testWorkerProfile = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // 1. Create a test worker user
        const testEmail = 'testworker_' + Date.now() + '@example.com';
        const user = new User({
            name: 'Test Worker',
            email: testEmail,
            password: 'password123',
            role: 'worker',
            phone: '1234567890',
            region: 'Test Region',
            district: 'Test District'
        });
        await user.save();
        console.log('Test user created:', user._id);

        // 2. Try to find profile (should be null)
        let profile = await WorkerProfile.findOne({ user: user._id });
        console.log('Initial profile (should be null):', profile);

        // 3. Create profile
        profile = new WorkerProfile({
            user: user._id,
            skills: ['Harvesting', 'Sowing'],
            dailyRate: 500,
            experience: 2,
            bio: 'Test bio',
            availability: 'Available'
        });
        await profile.save();
        console.log('Profile created:', profile._id);

        // 4. Fetch profile again
        profile = await WorkerProfile.findOne({ user: user._id }).populate('user');
        console.log('Fetched profile:', profile);

        if (profile && profile.user.email === testEmail) {
            console.log('SUCCESS: Worker profile linked correctly.');
        } else {
            console.log('FAILURE: Worker profile not linked correctly.');
        }

        // Cleanup
        await WorkerProfile.deleteOne({ _id: profile._id });
        await User.deleteOne({ _id: user._id });
        console.log('Cleanup done');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

testWorkerProfile();
