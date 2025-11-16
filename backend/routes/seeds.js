const express = require('express');
const router = express.Router();
const Seed = require('../models/Seed');

// @route   GET /api/seeds
// @desc    Get seeds by crop name and/or district
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { cropName, district } = req.query;
        let query = { status: 'active' };

        if (cropName) {
            query.cropName = new RegExp(cropName, 'i');
        }

        if (district) {
            query.suitableDistricts = district;
        }

        const seeds = await Seed.find(query).sort({ rating: -1 });
        
        res.json({
            success: true,
            seeds,
            total: seeds.length,
            filters: { cropName, district }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/seeds/crop/:cropName
// @desc    Get seeds for specific crop
// @access  Public
router.get('/crop/:cropName', async (req, res) => {
    try {
        const seeds = await Seed.find({ 
            cropName: new RegExp(req.params.cropName, 'i'),
            status: 'active'
        }).sort({ rating: -1 });

        res.json({
            success: true,
            seeds,
            total: seeds.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/seeds
// @desc    Create new seed variety (Admin only)
// @access  Private
router.post('/', async (req, res) => {
    try {
        const seed = new Seed(req.body);
        await seed.save();
        res.status(201).json(seed);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   PUT /api/seeds/:id
// @desc    Update seed (Admin only)
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const seed = await Seed.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!seed) {
            return res.status(404).json({ error: 'Seed not found' });
        }
        res.json(seed);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   DELETE /api/seeds/:id
// @desc    Delete seed (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const seed = await Seed.findByIdAndDelete(req.params.id);
        if (!seed) {
            return res.status(404).json({ error: 'Seed not found' });
        }
        res.json({ success: true, message: 'Seed deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;