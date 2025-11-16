const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// @route   GET /api/stores
// @desc    Get stores by district
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { district, type } = req.query;
        let query = {};

        if (district) {
            query.district = new RegExp(district, 'i');
        }

        if (type) {
            query.type = type;
        }

        const stores = await Store.find(query).sort({ rating: -1 });
        
        res.json({
            success: true,
            stores,
            total: stores.length,
            filters: { district, type }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/stores/district/:district
// @desc    Get stores by specific district
// @access  Public
router.get('/district/:district', async (req, res) => {
    try {
        const stores = await Store.find({ 
            district: new RegExp(req.params.district, 'i')
        }).sort({ rating: -1 });

        res.json({
            success: true,
            stores,
            total: stores.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/stores
// @desc    Create new store (Admin only)
// @access  Private
router.post('/', async (req, res) => {
    try {
        const store = new Store(req.body);
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   PUT /api/stores/:id/status
// @desc    Update store status
// @access  Private
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const store = await Store.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   PUT /api/stores/:id
// @desc    Update store (Admin only)
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// @route   DELETE /api/stores/:id
// @desc    Delete store (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json({ success: true, message: 'Store deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;