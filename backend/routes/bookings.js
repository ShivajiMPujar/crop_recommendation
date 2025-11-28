const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Booking Routes
router.post('/', auth, bookingController.createBooking);
router.get('/worker', auth, bookingController.getWorkerBookings);
router.get('/farmer', auth, bookingController.getFarmerBookings);
router.put('/:id/status', auth, bookingController.updateStatus);
router.post('/review', auth, bookingController.createReview);
router.get('/earnings', auth, bookingController.getEarnings);

module.exports = router;
