const WorkerBooking = require('../models/WorkerBooking');
const WorkerEarnings = require('../models/WorkerEarnings');
const WorkerReview = require('../models/WorkerReview');

// Create Booking (Farmer)
exports.createBooking = async (req, res) => {
    try {
        const { workerId, workType, startDate, days, offeredRate, notes } = req.body;
        const farmerId = req.user.id;

        const totalAmount = offeredRate * days;

        const booking = new WorkerBooking({
            worker: workerId,
            farmer: farmerId,
            workType,
            startDate,
            days,
            offeredRate,
            totalAmount,
            notes
        });

        await booking.save();
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Bookings for Worker
exports.getWorkerBookings = async (req, res) => {
    try {
        const bookings = await WorkerBooking.find({ worker: req.user.id })
            .populate('farmer', 'name district region phone')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Bookings for Farmer
exports.getFarmerBookings = async (req, res) => {
    try {
        const bookings = await WorkerBooking.find({ farmer: req.user.id })
            .populate('worker', 'name phone')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Booking Status (Worker)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const bookingId = req.params.id;
        const workerId = req.user.id;

        const booking = await WorkerBooking.findOne({ _id: bookingId, worker: workerId });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.status = status;
        booking.updatedAt = Date.now();
        await booking.save();

        // If completed, add to earnings
        if (status === 'Completed') {
            const earning = new WorkerEarnings({
                worker: workerId,
                booking: bookingId,
                amount: booking.totalAmount
            });
            await earning.save();
        }

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create Review (Farmer)
exports.createReview = async (req, res) => {
    try {
        const { bookingId, rating, reviewText } = req.body;
        const farmerId = req.user.id;

        const booking = await WorkerBooking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        if (booking.farmer.toString() !== farmerId) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const review = new WorkerReview({
            booking: bookingId,
            worker: booking.worker,
            farmer: farmerId,
            rating,
            reviewText
        });

        await review.save();
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Worker Earnings
exports.getEarnings = async (req, res) => {
    try {
        const earnings = await WorkerEarnings.find({ worker: req.user.id })
            .populate({
                path: 'booking',
                populate: { path: 'farmer', select: 'name' }
            })
            .sort({ date: -1 });

        const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);

        res.json({ earnings, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
