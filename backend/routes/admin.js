const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop = require('../models/Crop');
const Seed = require('../models/Seed');
const Store = require('../models/Store');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin credentials (default admin account)
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// @route   POST /api/admin/login
// @desc    Admin login with email & password
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔐 ADMIN LOGIN ATTEMPT with:', { email, password: password ? '***' : 'missing' });

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if it's the default admin account
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            console.log('✅ DEFAULT ADMIN ACCOUNT MATCHED');
            const token = jwt.sign({ 
                id: 'admin-default', 
                role: 'admin' 
            }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

            return res.json({
                success: true,
                message: 'Admin login successful',
                token,
                user: { 
                    id: 'admin-default',
                    name: 'System Administrator',
                    email: ADMIN_EMAIL,
                    role: 'admin',
                    isDefaultAdmin: true
                }
            });
        }

        // Check if user exists in database with admin role
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid admin credentials' });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'User is not an admin' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid admin credentials' });
        }

        const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        res.json({
            success: true,
            message: 'Admin login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: 'admin',
                isDefaultAdmin: false
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Server error during admin login' });
    }
});

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private
router.get('/stats', verifyToken, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCrops = await Crop.countDocuments();
        const totalSeeds = await Seed.countDocuments();
        const totalStores = await Store.countDocuments();

        // Recent users (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUsers = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.json({
            totalUsers,
            totalCrops,
            totalSeeds,
            totalStores,
            totalRecommendations: 0,
            recentUsers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private
router.put('/users/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private
router.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;