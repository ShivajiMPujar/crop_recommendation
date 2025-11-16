import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { seedAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
//import './SeedRecommendation.css';

const SeedRecommendation = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [seeds, setSeeds] = useState([]);
  const [formData, setFormData] = useState({
    cropName: '',
    district: user?.district || ''
  });

  const popularCrops = [
    'Groundnut', 'Cotton', 'Sugarcane', 'Paddy', 'Ragi', 'Jowar', 'Maize', 'Sunflower'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cropQuery = (formData.cropName || '').trim();
      if (!cropQuery) {
        setSeeds([]);
        setLoading(false);
        return alert('Please enter a crop name to search.');
      }

      // First attempt: query by params (supports district filtering)
      const response = await seedAPI.getByCrop(cropQuery, formData.district);
      console.debug('seedAPI.getByCrop response:', response?.data);

      let result = [];
      if (response?.data) {
        if (Array.isArray(response.data)) result = response.data;
        else if (Array.isArray(response.data.seeds)) result = response.data.seeds;
        else if (Array.isArray(response.data.data)) result = response.data.data;
        else if (Array.isArray(response.data.items)) result = response.data.items;
        else if (response.data.seeds && typeof response.data.seeds === 'object') result = response.data.seeds;
      }

      // Fallback: if no seeds returned from param search, try the explicit /seeds/crop/:cropName route
      if ((!result || result.length === 0) && cropQuery) {
        try {
          const r2 = await seedAPI.getByCropPath(cropQuery);
          console.debug('seedAPI.getByCropPath response:', r2?.data);
          if (r2?.data) {
            if (Array.isArray(r2.data)) result = r2.data;
            else if (Array.isArray(r2.data.seeds)) result = r2.data.seeds;
            else if (Array.isArray(r2.data.data)) result = r2.data.data;
            else if (Array.isArray(r2.data.items)) result = r2.data.items;
            else if (r2.data.seeds && typeof r2.data.seeds === 'object') result = r2.data.seeds;
          }
        } catch (err2) {
          console.debug('Fallback crop path failed:', err2?.response || err2);
        }
      }

      setSeeds(result || []);
    } catch (error) {
      console.error('Error getting seeds:', error?.response || error);
      alert('Failed to get seed recommendations. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (crop) => {
    setFormData(prev => ({ ...prev, cropName: crop }));
  };

  return (
    <div className="bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] container py-12 min-h-screen">
      <div className="mb-12 bg-pista-50 rounded-2xl p-8 shadow-lg border border-secondary-100">
        <h2 className="text-3xl font-bold text-green-700 mb-8">{t('seedRecommendation')}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="cropName" className="block mb-2 text-text-secondary font-medium">{t('cropName')}</label>
            <input
              type="text"
              id="cropName"
              name="cropName"
              value={formData.cropName}
              onChange={handleInputChange}
              placeholder={t('enterCropName')}
              className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
              list="cropSuggestions"
            />
            <datalist id="cropSuggestions">
              {popularCrops.map(crop => (
                <option key={crop} value={crop} />
              ))}
            </datalist>
          </div>

          <div className="space-y-3">
            <p className="text-text-secondary font-medium">Quick select:</p>
            <div className="flex flex-wrap gap-3">
              {popularCrops.map(crop => (
                <button
                  key={crop}
                  type="button"
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    formData.cropName === crop 
                      ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg' 
                      : 'bg-pista-50 text-text-secondary hover:bg-pista-100'
                  }`}
                  onClick={() => handleQuickSelect(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full btn btn-primary py-3" disabled={loading}>
            {loading ? <LoadingSpinner /> : t('findSeeds')}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {seeds.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8">{t('seedVarieties')} for {formData.cropName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seeds.map((seed, index) => (
              <div key={seed._id || index} className="bg-pista-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-100">
                <div className="mb-6 relative">
                  <img 
                    src={seed.image} 
                    alt={seed.varietyName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-br from-green-600 to-emerald-400 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    ⭐ {seed.rating}/5
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-700">{seed.varietyName}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('type')}:</span>
                      <span className="text-text-secondary">{seed.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('brand')}:</span>
                      <span className="text-text-secondary">{seed.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('price')}:</span>
                      <span className="text-text-secondary font-semibold">₹{seed.pricePerKg}/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('germination')}:</span>
                      <span className="text-text-secondary">{seed.germinationRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('duration')}:</span>
                      <span className="text-text-secondary">{seed.duration}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <strong className="text-text-primary">{t('features')}:</strong>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {seed.specialFeatures?.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="w-full btn btn-primary py-2 text-sm"
                    onClick={() => window.open(`tel:${seed.contact}`)}
                  >
                    📞 {t('contactSupplier')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {seeds.length === 0 && !loading && (
        <div className="p-8 bg-pista-50 rounded-lg text-center">
          <p className="text-text-secondary">Enter a crop name to find recommended seed varieties.</p>
        </div>
      )}
    </div>
  );
};

export default SeedRecommendation;