import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import workerService from '../services/worker';
import bookingService from '../services/booking';

const WorkerDashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [earnings, setEarnings] = useState({ total: 0, earnings: [] });
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [profileForm, setProfileForm] = useState({
        skills: [],
        dailyRate: '',
        experience: '',
        bio: '',
        availability: 'Available'
    });

    const skillOptions = [
        t('harvesting') || 'Harvesting',
        t('sowing') || 'Sowing',
        t('weeding') || 'Weeding',
        t('spraying') || 'Spraying',
        t('irrigation') || 'Irrigation',
        t('tractorOperation') || 'Tractor Operation',
        t('generalLabour') || 'General Labour'
    ];

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'profile') {
                try {
                    const data = await workerService.getProfile();
                    setProfile(data);
                    setProfileForm({
                        skills: data.skills || [],
                        dailyRate: data.dailyRate || '',
                        experience: data.experience || '',
                        bio: data.bio || '',
                        availability: data.availability || 'Available'
                    });
                } catch (err) {
                    console.log('No profile found');
                }
            } else if (activeTab === 'bookings') {
                const data = await bookingService.getWorkerBookings();
                setBookings(data);
            } else if (activeTab === 'earnings') {
                const data = await bookingService.getEarnings();
                setEarnings(data);
            } else if (activeTab === 'reviews') {
                const data = await workerService.getReviews();
                setReviews(data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await workerService.updateProfile(profileForm);
            alert('Profile updated successfully!');
            loadData();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    const handleSkillToggle = (skill) => {
        setProfileForm(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleBookingAction = async (bookingId, status) => {
        try {
            await bookingService.updateStatus(bookingId, status);
            alert(`Booking ${status.toLowerCase()} successfully!`);
            loadData();
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] pt-20 pb-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('workerDashboard')}</h1>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-6">
                    <div className="flex border-b">
                        {['profile', 'bookings', 'earnings', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 px-6 font-semibold capitalize ${activeTab === tab
                                    ? 'border-b-4 border-green-600 text-green-600'
                                    : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                {t(`my${tab.charAt(0).toUpperCase() + tab.slice(1)}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="text-2xl">{t('loading')}</div>
                        </div>
                    ) : (
                        <>
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    {/* Current Profile Summary */}
                                    {profile && (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-green-800 mb-4">{t('currentProfileStatus')}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">{t('dailyRate')}</p>
                                                    <p className="font-semibold">₹{profile.dailyRate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">{t('experience')}</p>
                                                    <p className="font-semibold">{profile.experience} {t('years') || 'years'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">{t('availability')}</p>
                                                    <span className={`px-2 py-1 rounded text-sm font-semibold ${profile.availability === 'Available' ? 'bg-green-200 text-green-800' :
                                                        profile.availability === 'Busy' ? 'bg-red-200 text-red-800' :
                                                            'bg-yellow-200 text-yellow-800'
                                                        }`}>
                                                        {t(profile.availability.toLowerCase()) || profile.availability}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">{t('skills')}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {profile.skills && profile.skills.map(skill => (
                                                            <span key={skill} className="bg-white border border-green-200 text-green-700 px-2 py-0.5 rounded text-xs">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                                        <h2 className="text-2xl font-bold mb-4">{profile ? t('editProfile') || 'Edit Profile' : t('createProfile') || 'Create Profile'}</h2>

                                        <div>
                                            <label className="block mb-2 font-semibold">{t('skills')} ({t('selectAllThatApply') || 'Select all that apply'})</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {skillOptions.map(skill => (
                                                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={profileForm.skills.includes(skill)}
                                                            onChange={() => handleSkillToggle(skill)}
                                                            className="w-4 h-4"
                                                        />
                                                        <span>{skill}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 font-semibold">{t('dailyRate')}</label>
                                                <input
                                                    type="number"
                                                    value={profileForm.dailyRate}
                                                    onChange={(e) => setProfileForm({ ...profileForm, dailyRate: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 font-semibold">{t('experience')}</label>
                                                <input
                                                    type="number"
                                                    value={profileForm.experience}
                                                    onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold">{t('availability')}</label>
                                            <select
                                                value={profileForm.availability}
                                                onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            >
                                                <option value="Available">Available</option>
                                                <option value="Busy">Busy</option>
                                                <option value="Seasonal">Seasonal</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold">{t('bio')}</label>
                                            <textarea
                                                value={profileForm.bio}
                                                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                rows="4"
                                                maxLength="500"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
                                        >
                                            {t('saveProfile')}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Bookings Tab */}
                            {activeTab === 'bookings' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">{t('bookingRequests') || 'Booking Requests'}</h2>
                                    {bookings.length === 0 ? (
                                        <p className="text-gray-600">{t('noBookings')}</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {bookings.map(booking => (
                                                <div key={booking._id} className="border rounded-lg p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold">{booking.farmer?.name}</h3>
                                                            <p className="text-gray-600">{booking.farmer?.district}, {booking.farmer?.region}</p>
                                                            <p className="text-gray-600">{booking.farmer?.phone}</p>
                                                        </div>
                                                        <span className={`px-4 py-2 rounded-full font-semibold ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                                booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                                    'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <p className="text-sm text-gray-600">{t('workType')}</p>
                                                            <p className="font-semibold">{booking.workType}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">{t('startDate')}</p>
                                                            <p className="font-semibold">{new Date(booking.startDate).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">{t('duration')}</p>
                                                            <p className="font-semibold">{booking.days} {t('days') || 'day(s)'}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">{t('offeredRate')}</p>
                                                            <p className="font-semibold">₹{booking.offeredRate}/day</p>
                                                        </div>
                                                    </div>
                                                    {booking.notes && (
                                                        <p className="text-gray-700 mb-4"><strong>{t('notes')}:</strong> {booking.notes}</p>
                                                    )}
                                                    {booking.status === 'Pending' && (
                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={() => handleBookingAction(booking._id, 'Approved')}
                                                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                                                            >
                                                                {t('accept')}
                                                            </button>
                                                            <button
                                                                onClick={() => handleBookingAction(booking._id, 'Rejected')}
                                                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                                                            >
                                                                {t('reject')}
                                                            </button>
                                                        </div>
                                                    )}
                                                    {booking.status === 'Approved' && (
                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={() => handleBookingAction(booking._id, 'Completed')}
                                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                                            >
                                                                {t('markAsCompleted')}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    const address = `${booking.farmer?.district}, ${booking.farmer?.region}`;
                                                                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
                                                                }}
                                                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                                                            >
                                                                <span>📍</span> {t('getDirections')}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Earnings Tab */}
                            {activeTab === 'earnings' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">{t('myEarnings')}</h2>
                                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                                        <p className="text-gray-700 mb-2">{t('totalEarnings')}</p>
                                        <p className="text-4xl font-bold text-green-700">₹{earnings.total}</p>
                                    </div>
                                    {earnings.earnings.length === 0 ? (
                                        <p className="text-gray-600">{t('noEarnings')}</p>
                                    ) : (
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3">{t('date')}</th>
                                                    <th className="text-left py-3">{t('farmer') || 'Farmer'}</th>
                                                    <th className="text-left py-3">{t('workType') || 'Work Type'}</th>
                                                    <th className="text-right py-3">{t('amount')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {earnings.earnings.map(earning => (
                                                    <tr key={earning._id} className="border-b">
                                                        <td className="py-3">{new Date(earning.date).toLocaleDateString()}</td>
                                                        <td className="py-3">{earning.booking?.farmer?.name}</td>
                                                        <td className="py-3">{earning.booking?.workType}</td>
                                                        <td className="py-3 text-right font-semibold">₹{earning.amount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">{t('myReviews')}</h2>
                                    {reviews.length === 0 ? (
                                        <p className="text-gray-600">{t('noReviews')}</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {reviews.map(review => (
                                                <div key={review._id} className="border rounded-lg p-6">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold">{review.farmer?.name}</h3>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">{review.reviewText}</p>
                                                    <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
