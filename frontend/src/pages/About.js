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
          <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Mission</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            We aim to help Karnataka farmers make informed decisions about crop cultivation 
            by providing accurate recommendations based on soil conditions, weather patterns, 
            and market trends.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Soil Analysis</h3>
              <p className="text-text-secondary">
                Get recommendations based on your soil type and nutrients
              </p>
            </div>
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Weather Data</h3>
              <p className="text-text-secondary">
                Consider local weather patterns for optimal planting
              </p>
            </div>
            <div className="p-6 border-2 border-secondary-100 rounded-xl bg-pista-50 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Market Trends</h3>
              <p className="text-text-secondary">
                Stay updated with current market demands and prices
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;