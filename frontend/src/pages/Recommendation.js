import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import CropRecommendation from '../components/recommendation/CropRecommendation';
import SeedRecommendation from '../components/recommendation/SeedRecommendation';
import StoreRecommendation from '../components/recommendation/StoreRecommendation';

const Recommendation = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('crop');

  if (!user) {
    return (
      <div className="font-poppins min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] text-gray-900 py-16">
        <div className="container">
          <div className="bg-pista-50 p-12 rounded-2xl shadow-lg text-center border-2 border-secondary-100">
            <h2 className="text-3xl font-bold mb-4 text-text-primary">
              {t('authRequired') || 'Authentication Required'}
            </h2>
            <p className="text-lg text-text-secondary">
              {t('loginMessage') || 'Please register or login to access crop recommendations.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tabClass = (key) => (
    `flex-1 px-5 md:px-6 py-3 md:py-4 rounded-xl text-lg font-semibold transition-all duration-250 flex items-center justify-center gap-3 ${
      activeTab === key ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg' : 'text-text-secondary hover:bg-secondary-50'
    }`
  );

  return (
    <div className="font-poppins bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] text-gray-900 py-8 min-h-screen">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {t('cropRecommendation') || 'Crop Recommendation'}
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('recommendationDesc') || 'Get personalized recommendations based on your farm location and conditions'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row gap-3 bg-pista-50 rounded-2xl p-2 md:p-1 shadow-md border-2 border-secondary-100 mb-8">
          <button
            type="button"
            aria-pressed={activeTab === 'crop'}
            className={tabClass('crop')}
            onClick={() => setActiveTab('crop')}
          >
            <span className="text-2xl">🌱</span>
            <span>{t('cropTab') || 'Crop Recommendation'}</span>
          </button>

          <button
            type="button"
            aria-pressed={activeTab === 'seed'}
            className={tabClass('seed')}
            onClick={() => setActiveTab('seed')}
          >
            <span className="text-2xl">🌾</span>
            <span>{t('seedTab') || 'Seed Finder'}</span>
          </button>

          <button
            type="button"
            aria-pressed={activeTab === 'store'}
            className={tabClass('store')}
            onClick={() => setActiveTab('store')}
          >
            <span className="text-2xl">🏬</span>
            <span>{t('storeTab') || 'Store Locator'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[24rem]">
          {activeTab === 'crop' && <CropRecommendation />}
          {activeTab === 'seed' && <SeedRecommendation />}
          {activeTab === 'store' && <StoreRecommendation />}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;