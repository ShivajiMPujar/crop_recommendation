import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import workerService from '../services/worker';
import bookingService from '../services/booking';

const FarmerHireWorker = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        district: user?.district || '',
        workType: '',
        maxRate: ''
    });
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        workType: '',
        startDate: '',
        days: 1,
        offeredRate: '',
        notes: ''
    });
    const [myBookings, setMyBookings] = useState([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showMyBookings, setShowMyBookings] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        bookingId: '',
        rating: 5,
        reviewText: ''
    });
    const [showReviewModal, setShowReviewModal] = useState(false);

    const workTypes = ['Harvesting', 'Sowing', 'Weeding', 'Spraying', 'Irrigation', 'Tractor Operation', 'General Labour'];

    useEffect(() => {
        searchWorkers();
    }, []);

    const searchWorkers = async () => {
        setLoading(true);
        try {
            const data = await workerService.searchWorkers(filters);
            setWorkers(data);
        } catch (error) {
            console.error('Error searching workers:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMyBookings = async () => {
        try {
            const data = await bookingService.getFarmerBookings();
            setMyBookings(data);
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    };

    const handleHireClick = (worker) => {
        setSelectedWorker(worker);
        setBookingForm({
            ...bookingForm,
            workType: worker.skills[0] || '',
            offeredRate: worker.dailyRate
        });
        setShowBookingModal(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookingService.createBooking({
                workerId: selectedWorker.user._id,
                ...bookingForm
            });
            alert('Booking request sent successfully!');
            setShowBookingModal(false);
            setBookingForm({
                workType: '',
                startDate: '',
                days: 1,
                offeredRate: '',
                notes: ''
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookingService.createReview(reviewForm);
            alert('Review submitted successfully!');
            setShowReviewModal(false);
            setReviewForm({
                bookingId: '',
                rating: 5,
                reviewText: ''
            });
            loadMyBookings();
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        }
    };

    const openReviewModal = (booking) => {
        setReviewForm({
            bookingId: booking._id,
            rating: 5,
            reviewText: ''
        });
        setShowReviewModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Hire Workers</h1>
                    <button
                        onClick={() => {
                            setShowMyBookings(!showMyBookings);
                            if (!showMyBookings) loadMyBookings();
                        }}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                        {showMyBookings ? 'Search Workers' : 'My Bookings'}
                    </button>
                </div>

                {!showMyBookings ? (
                    <>
                        {/* Search Filters */}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4">Search Filters</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-2 font-semibold">Work Type</label>
                                    <select
                                        value={filters.workType}
                                        onChange={(e) => setFilters({ ...filters, workType: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    >
                                        <option value="">All Types</option>
                                        {workTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Max Daily Rate (₹)</label>
                                    <input
                                        type="number"
                                        value={filters.maxRate}
                                        onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        placeholder="Any"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={searchWorkers}
                                        className="w-full bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Workers Grid */}
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="text-2xl">Loading...</div>
                            </div>
                        ) : workers.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">👷</div>
                                <h3 className="text-xl font-semibold text-gray-700">No workers found</h3>
                                <p className="text-gray-500">Try adjusting your search filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {workers.map(worker => (
                                    <div key={worker._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{worker.user.name}</h3>
                                                <p className="text-gray-600">{worker.user.district}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${worker.availability === 'Available' ? 'bg-green-100 text-green-800' :
                                                    worker.availability === 'Busy' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {worker.availability}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">Skills:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {worker.skills.map(skill => (
                                                    <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Daily Rate</p>
                                                <p className="font-bold text-green-600">₹{worker.dailyRate}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Experience</p>
                                                <p className="font-bold">{worker.experience} years</p>
                                            </div>
                                        </div>

                                        {worker.avgRating > 0 && (
                                            <div className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="flex text-yellow-500 mr-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={i < Math.round(worker.avgRating) ? '' : 'text-gray-300'}>
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-600">({worker.reviewCount} reviews)</span>
                                                </div>
                                            </div>
                                        )}

                                        {worker.bio && (
                                            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{worker.bio}</p>
                                        )}

                                        <button
                                            onClick={() => handleHireClick(worker)}
                                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                                        >
                                            Hire Worker
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    /* My Bookings */
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                        {myBookings.length === 0 ? (
                            <p className="text-gray-600">No bookings yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {myBookings.map(booking => (
                                    <div key={booking._id} className="border rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{booking.worker?.name}</h3>
                                                <p className="text-gray-600">{booking.worker?.phone}</p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full font-semibold ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Work Type</p>
                                                <p className="font-semibold">{booking.workType}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Start Date</p>
                                                <p className="font-semibold">{new Date(booking.startDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Duration</p>
                                                <p className="font-semibold">{booking.days} day(s)</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Total Amount</p>
                                                <p className="font-semibold text-green-600">₹{booking.totalAmount}</p>
                                            </div>
                                        </div>
                                        {booking.status === 'Completed' && (
                                            <button
                                                onClick={() => openReviewModal(booking)}
                                                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                            >
                                                Write Review
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Booking Modal */}
                {showBookingModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-bold mb-6">Book Worker</h2>
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-semibold">Work Type</label>
                                    <select
                                        value={bookingForm.workType}
                                        onChange={(e) => setBookingForm({ ...bookingForm, workType: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        {selectedWorker?.skills.map(skill => (
                                            <option key={skill} value={skill}>{skill}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Start Date</label>
                                    <input
                                        type="date"
                                        value={bookingForm.startDate}
                                        onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Number of Days</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={bookingForm.days}
                                        onChange={(e) => setBookingForm({ ...bookingForm, days: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Offered Rate (₹/day)</label>
                                    <input
                                        type="number"
                                        value={bookingForm.offeredRate}
                                        onChange={(e) => setBookingForm({ ...bookingForm, offeredRate: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Notes (Optional)</label>
                                    <textarea
                                        value={bookingForm.notes}
                                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows="3"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                                    >
                                        Send Request
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Review Modal */}
                {showReviewModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-bold mb-6">Write Review</h2>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-semibold">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                className={`text-3xl ${star <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold">Review</label>
                                    <textarea
                                        value={reviewForm.reviewText}
                                        onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows="4"
                                        placeholder="Share your experience..."
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowReviewModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmerHireWorker;
