import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { cropAPI } from '../../services/api';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
//import './CropRecommendation.css';

const CropRecommendation = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    soilType: user?.soilType || '',
    district: user?.district || '',
    temperature: '',
    rainfall: ''
  });

  const soilTypes = [
    { value: 'Red Soil', label: t('redSoil') || 'Red Soil' },
    { value: 'Black Soil', label: t('blackSoil') || 'Black Soil' },
    { value: 'Alluvial Soil', label: t('alluvialSoil') || 'Alluvial Soil' },
    { value: 'Laterite Soil', label: t('lateriteSoil') || 'Laterite Soil' },
    { value: 'Sandy Soil', label: t('sandySoil') || 'Sandy Soil' },
    { value: 'Clay Soil', label: t('claySoil') || 'Clay Soil' }
  ];

  const karnatakaDistricts = [
    { value: 'Bagalkot', label: t('dist_Bagalkot') },
    { value: 'Bangalore Rural', label: t('dist_Bengaluru_Rural') },
    { value: 'Bangalore Urban', label: t('dist_Bengaluru_Urban') },
    { value: 'Belagavi', label: t('dist_Belagavi') },
    { value: 'Bellary', label: t('dist_Ballari') },
    { value: 'Bidar', label: t('dist_Bidar') },
    { value: 'Vijayapura', label: t('dist_Vijayapura') },
    { value: 'Chamarajanagar', label: t('dist_Chamarajanagar') },
    { value: 'Chikkaballapur', label: t('dist_Chikkaballapura') },
    { value: 'Chikmagalur', label: t('dist_Chikkamagaluru') },
    { value: 'Dakshina Kannada', label: t('dist_Dakshina_Kannada') },
    { value: 'Davanagere', label: t('dist_Davanagere') },
    { value: 'Dharwad', label: t('dist_Dharwad') },
    { value: 'Gadag', label: t('dist_Gadag') },
    { value: 'Hassan', label: t('dist_Hassan') },
    { value: 'Haveri', label: t('dist_Haveri') },
    { value: 'Kalaburagi', label: t('dist_Kalaburagi') },
    { value: 'Kodagu', label: t('dist_Kodagu') },
    { value: 'Kolar', label: t('dist_Kolar') },
    { value: 'Koppal', label: t('dist_Koppal') },
    { value: 'Mandya', label: t('dist_Mandya') },
    { value: 'Mysore', label: t('dist_Mysuru') },
    { value: 'Raichur', label: t('dist_Raichur') },
    { value: 'Ramanagara', label: t('dist_Ramanagara') },
    { value: 'Shivamogga', label: t('dist_Shivamogga') },
    { value: 'Tumakuru', label: t('dist_Tumakuru') },
    { value: 'Udupi', label: t('dist_Udupi') },
    { value: 'Uttara Kannada', label: t('dist_Uttara_Kannada') },
    { value: 'Vijayanagara', label: 'Vijayanagara' },
    { value: 'Yadgir', label: t('dist_Yadgir') }
  ];

  const rainfallRanges = [
    { value: '300', label: t('rainfallLow') || '< 300 mm (Low)' },
    { value: '600', label: t('rainfallMedium') || '300 - 600 mm (Medium)' },
    { value: '900', label: t('rainfallMediumHigh') || '600 - 900 mm (Medium-High)' },
    { value: '1200', label: t('rainfallHigh') || '900 - 1200 mm (High)' },
    { value: '1500', label: t('rainfallVeryHigh') || '1200 - 1500 mm (Very High)' },
    { value: '1800', label: t('rainfallExcessive') || '> 1500 mm (Excessive)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchTemperature = () => {
    if (!navigator.geolocation) {
      alert(t('geolocationNotSupported') || 'Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );

          if (response.data && response.data.current_weather) {
            setFormData(prev => ({
              ...prev,
              temperature: response.data.current_weather.temperature.toString()
            }));
          }
        } catch (error) {
          console.error('Error fetching weather:', error);
          alert(t('failedFetchWeather') || 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        alert(t('locationPermissionDenied') || 'Please allow location access to fetch temperature');
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await cropAPI.recommend(formData);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert(t('failedLoadRecommendations'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] container py-12 min-h-screen">
      <div className="mb-12 bg-pista-50 rounded-2xl p-8 shadow-lg border border-secondary-100">
        <h2 className="text-3xl font-bold text-green-700 mb-8">{t('enterDetails')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="soilType" className="block mb-2 text-text-secondary font-medium">{t('soilType')}</label>
              <select
                id="soilType"
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">{t('selectSoil')}</option>
                {soilTypes.map(soil => (
                  <option key={soil.value} value={soil.value}>{soil.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="district" className="block mb-2 text-text-secondary font-medium">{t('district')}</label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">{t('selectDistrict')}</option>
                {karnatakaDistricts.map(district => (
                  <option key={district.value} value={district.value}>{district.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="temperature" className="block mb-2 text-text-secondary font-medium">{t('temperature')}</label>
              <div className="relative">
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder={t('enterTemp')}
                  className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500 pr-24"
                  min="0"
                  max="50"
                  step="0.1"
                  required
                />
                <button
                  type="button"
                  onClick={fetchTemperature}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                  title="Get current temperature"
                >
                  {t('getTemp') || 'Get Temp'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rainfall" className="block mb-2 text-text-secondary font-medium">{t('rainfall')}</label>
              <select
                id="rainfall"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">{t('selectRainfall') || 'Select rainfall range'}</option>
                {rainfallRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary py-3"
            disabled={loading}
          >
            {loading ? t('loading') : t('search')}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {recommendations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8">{t('recommendedCrops')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((crop, index) => (
              <div key={crop._id || index} className="bg-pista-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pista-100">
                <div className="mb-6 relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-br from-green-600 to-emerald-400 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {crop.matchPercentage}% {t('match')}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-green-700">{crop.name}</h3>
                    <p className="text-sm text-text-secondary italic">{crop.scientificName}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('season')}:</span>
                      <span className="text-text-secondary">{crop.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('duration')}:</span>
                      <span className="text-text-secondary">{crop.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-secondary">{t('waterNeeds')}:</span>
                      <span className="text-text-secondary">{crop.waterNeeds}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-secondary mb-1">{t('fertilizers')}:</span>
                      <span className="text-text-secondary text-sm">{crop.fertilizers?.join(', ')}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <strong className="text-green-700">{t('expectedYield')}:</strong>
                    <span className="text-text-secondary ml-2">{crop.yield}</span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed">{crop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length === 0 && !loading && (
        <div className="p-8 bg-secondary-50 rounded-lg text-center">
          <p className="text-text-secondary">{t('noDataFound')}</p>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;