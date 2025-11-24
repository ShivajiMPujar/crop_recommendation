import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-[#fff7ed] to-[#ecfdf5] py-8 md:py-12 min-h-screen">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          {t('about') || 'About Us'}
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-text-primary">{t('ourMission')}</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {t('missionStatement')}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-text-primary">{t('howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">{t('soilAnalysisTitle')}</h3>
              <p className="text-text-secondary">
                {t('soilAnalysisDesc')}
              </p>
            </div>
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">{t('weatherDataTitle')}</h3>
              <p className="text-text-secondary">
                {t('weatherDataDesc')}
              </p>
            </div>
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">{t('marketTrendsTitle')}</h3>
              <p className="text-text-secondary">
                {t('marketTrendsDesc')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;