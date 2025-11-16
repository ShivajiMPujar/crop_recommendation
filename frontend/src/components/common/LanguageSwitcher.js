import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' }
  ];

  return (
    <div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 py-2 border-2 border-secondary-100 rounded-lg text-base bg-pista-50 text-text-secondary font-medium cursor-pointer transition-all duration-300 hover:border-primary-500 focus:outline-none focus:border-primary-500"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;