const WorkerProfile = require('../models/WorkerProfile');
const User = require('../models/User');
const WorkerReview = require('../models/WorkerReview');

// Create or Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { skills, dailyRate, experience, bio, availability } = req.body;
        const userId = req.user.id;

        let profile = await WorkerProfile.findOne({ user: userId });

        if (profile) {
            // Update
            profile.skills = skills || profile.skills;
            profile.dailyRate = dailyRate || profile.dailyRate;
            profile.experience = experience || profile.experience;
            profile.bio = bio || profile.bio;
            profile.availability = availability || profile.availability;
            profile.updatedAt = Date.now();
            await profile.save();
        } else {
            // Create
            profile = new WorkerProfile({
                user: userId,
                skills,
                dailyRate,
                experience,
                bio,
                availability
            });
            await profile.save();
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Current Worker Profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await WorkerProfile.findOne({ user: req.user.id }).populate('user', 'name email phone district region');
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Search Workers (for Farmers)
exports.searchWorkers = async (req, res) => {
    try {
        const { district, workType, maxRate } = req.query;

        // Build query
        let query = {};

        // Filter by work type (skill)
        if (workType) {
            query.skills = workType;
        }

        // Filter by rate
        if (maxRate) {
            query.dailyRate = { $lte: parseInt(maxRate) };
        }

        // Find profiles matching skills and rate
        let profiles = await WorkerProfile.find(query).populate('user', 'name district region');

        // Filter by district (since district is in User model)
        if (district) {
            profiles = profiles.filter(p => p.user.district === district);
        }

        // Calculate average rating for each worker
        const profilesWithRatings = await Promise.all(profiles.map(async (p) => {
            const reviews = await WorkerReview.find({ worker: p.user._id });
            const avgRating = reviews.length > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                : 0;

            return {
                ...p.toObject(),
                avgRating,
                reviewCount: reviews.length
            };
        }));

        res.json(profilesWithRatings);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Worker Reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await WorkerReview.find({ worker: req.user.id })
            .populate('farmer', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
