/* Reworked Profile component: fetch latest user data and update auth context */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import workerService from '../services/worker';

const Profile = () => {
  const { t } = useLanguage();
  const { user, login } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [workerProfile, setWorkerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        // Fetch User Data
        const res = await authAPI.getUser(user.email);
        if (res?.data?.user) {
          setProfileData(res.data.user);
          // update auth context + localStorage with any new fields
          login({ ...res.data.user, token: user.token });
        } else {
          setProfileData(user);
        }

        // Fetch Worker Profile if role is worker
        if (user.role === 'worker') {
          try {
            const workerData = await workerService.getProfile();
            setWorkerProfile(workerData);
          } catch (err) {
            console.log('Worker profile not found or error fetching:', err);
          }
        }

      } catch (err) {
        console.error('Error fetching user data:', err);
        setProfileData(user);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user?.email, user?.role]); // Added user.role dependency

  const displayUser = profileData || user;

  const getTranslatedDistrict = (districtName) => {
    if (!districtName) return t('na');
    // Map of English names to translation keys
    const districtMap = {
      'Bagalkot': 'dist_Bagalkot',
      'Bangalore Rural': 'dist_Bengaluru_Rural',
      'Bangalore Urban': 'dist_Bengaluru_Urban',
      'Belagavi': 'dist_Belagavi',
      'Bellary': 'dist_Ballari',
      'Bidar': 'dist_Bidar',
      'Vijayapura': 'dist_Vijayapura',
      'Chamarajanagar': 'dist_Chamarajanagar',
      'Chikkaballapur': 'dist_Chikkaballapura',
      'Chikmagalur': 'dist_Chikkamagaluru',
      'Dakshina Kannada': 'dist_Dakshina_Kannada',
      'Davanagere': 'dist_Davanagere',
      'Dharwad': 'dist_Dharwad',
      'Gadag': 'dist_Gadag',
      'Hassan': 'dist_Hassan',
      'Haveri': 'dist_Haveri',
      'Kalaburagi': 'dist_Kalaburagi',
      'Kodagu': 'dist_Kodagu',
      'Kolar': 'dist_Kolar',
      'Koppal': 'dist_Koppal',
      'Mandya': 'dist_Mandya',
      'Mysore': 'dist_Mysuru',
      'Raichur': 'dist_Raichur',
      'Ramanagara': 'dist_Ramanagara',
      'Shivamogga': 'dist_Shivamogga',
      'Tumakuru': 'dist_Tumakuru',
      'Udupi': 'dist_Udupi',
      'Uttara Kannada': 'dist_Uttara_Kannada',
      'Yadgir': 'dist_Yadgir'
    };

    const key = districtMap[districtName];
    return key ? t(key) : districtName;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] py-8">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary">{t('profile') || 'Profile'}</h1>
          <div className="bg-pista-50 rounded-2xl shadow-lg p-8 border-2 border-secondary-100">{t('loading') || 'Loading...'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cfe9ff] to-[#e6f7ff] py-8">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-primary">
          {t('profile') || 'Profile'}
        </h1>

        {/* Profile Header Card */}
        <div className="bg-pista-50 rounded-2xl shadow-lg p-8 border-2 border-secondary-100 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full md:w-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-blue text-white flex items-center justify-center text-4xl font-bold flex-shrink-0">
                {displayUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  {displayUser?.name || 'User'}
                </h2>
                <p className="text-text-secondary text-lg">
                  {displayUser?.email || 'user@example.com'}
                </p>
                {displayUser?.role && (
                  <p className="text-sm font-medium mt-2 capitalize px-3 py-1 rounded-full inline-block bg-secondary-100 text-text-secondary">
                    {displayUser.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-pista-50 rounded-2xl shadow-lg p-8 border-2 border-secondary-100 mb-8">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            {t('profileDetails') || 'Profile Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('name') || 'Name'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.name || t('na')}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('email') || 'Email'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.email || t('na')}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('phone') || 'Phone'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.phone || t('na')}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('region') || 'Region'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.region || t('na')}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('district') || 'District'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {getTranslatedDistrict(displayUser?.district)}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('soilType') || 'Soil Type'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.soilType || t('notSet')}
              </p>
            </div>
          </div>
        </div>

        {/* Worker Specific Details */}
        {user?.role === 'worker' && workerProfile && (
          <div className="bg-pista-50 rounded-2xl shadow-lg p-8 border-2 border-secondary-100">
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              {t('workerDetails') || 'Worker Details'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bg-light rounded-xl p-4">
                <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                  {t('skills') || 'Skills'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {workerProfile.skills && workerProfile.skills.length > 0 ? (
                    workerProfile.skills.map((skill, index) => (
                      <span key={index} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-lg font-semibold text-text-primary">{t('na')}</p>
                  )}
                </div>
              </div>

              <div className="bg-bg-light rounded-xl p-4">
                <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                  {t('dailyRate') || 'Daily Rate'}
                </label>
                <p className="text-lg font-semibold text-text-primary">
                  ₹{workerProfile.dailyRate || t('na')}
                </p>
              </div>

              <div className="bg-bg-light rounded-xl p-4">
                <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                  {t('experience') || 'Experience'}
                </label>
                <p className="text-lg font-semibold text-text-primary">
                  {workerProfile.experience ? `${workerProfile.experience} years` : t('na')}
                </p>
              </div>

              <div className="bg-bg-light rounded-xl p-4">
                <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                  {t('availability') || 'Availability'}
                </label>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block mt-1 ${workerProfile.availability === 'Available' ? 'bg-green-100 text-green-800' :
                  workerProfile.availability === 'Busy' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {workerProfile.availability || t('na')}
                </span>
              </div>

              <div className="bg-bg-light rounded-xl p-4 md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                  {t('bio') || 'Bio'}
                </label>
                <p className="text-lg text-text-primary">
                  {workerProfile.bio || t('noBio')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;