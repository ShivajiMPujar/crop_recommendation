const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');
const auth = require('../middleware/auth');

// Worker Profile Routes
router.get('/profile', auth, workerController.getProfile);
router.put('/profile', auth, workerController.updateProfile);
router.get('/reviews', auth, workerController.getReviews);

// Public/Farmer Routes
router.get('/search', auth, workerController.searchWorkers);

module.exports = router;
