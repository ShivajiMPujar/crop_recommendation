  /* Reworked Profile component: fetch latest user data and update auth context */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Profile = () => {
  const { t } = useLanguage();
  const { user, login } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.getUser(user.email);
        if (res?.data?.user) {
          setProfileData(res.data.user);
          // update auth context + localStorage with any new fields
          login({ ...res.data.user, token: user.token });
        } else {
          setProfileData(user);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setProfileData(user);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user?.email]);

  const displayUser = profileData || user;

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
        <div className="bg-pista-50 rounded-2xl shadow-lg p-8 border-2 border-secondary-100">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            {t('profileDetails') || 'Profile Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('name') || 'Name'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.name || 'N/A'}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('email') || 'Email'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.email || 'N/A'}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('phone') || 'Phone'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.phone || 'N/A'}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('region') || 'Region'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.region || 'N/A'}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('district') || 'District'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.district || 'N/A'}
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4">
              <label className="block text-sm font-medium text-text-secondary mb-2 uppercase">
                {t('soilType') || 'Soil Type'}
              </label>
              <p className="text-lg font-semibold text-text-primary">
                {displayUser?.soilType || 'Not Set'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;