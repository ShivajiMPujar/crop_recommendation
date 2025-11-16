const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { recommendCrops } = require('../controllers/cropController');

// @route   POST /api/crops/recommend
// @desc    Get crop recommendations based on soil, region, temperature, rainfall
// @access  Public
router.post('/recommend', recommendCrops);

// @route   GET /api/crops
// @desc    Get all crops
// @access  Public
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find({ status: 'active' });
        res.json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/crops/:id
// @desc    Get crop by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.json(crop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/crops
// @desc    Create new crop (Admin only)
// @access  Private
router.post('/', async (req, res) => {
    try {
        const crop = new Crop(req.body);
        await crop.save();
        res.status(201).json(crop);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   PUT /api/crops/:id
// @desc    Update crop (Admin only)
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.json(crop);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   DELETE /api/crops/:id
// @desc    Delete crop (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const crop = await Crop.findByIdAndDelete(req.params.id);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.json({ success: true, message: 'Crop deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;