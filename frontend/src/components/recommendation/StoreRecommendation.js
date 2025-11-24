import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { storeAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
//import './StoreRecommendation.css';

const StoreRecommendation = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [district, setDistrict] = useState(user?.district || '');

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

  const storeTypes = [
    { value: 'KSSCL Depot', label: t('kssclDepot') || 'KSSCL Depot' },
    { value: 'Krishi Vikas Kendra', label: t('krishiVikasKendra') || 'Krishi Vikas Kendra' },
    { value: 'Private Dealer', label: t('privateDealer') || 'Private Dealer' },
    { value: 'Cooperative Society', label: t('cooperativeSociety') || 'Cooperative Society' }
  ];

  useEffect(() => {
    if (district) {
      fetchStores();
    }
  }, [district]);

  const fetchStores = async (type = '') => {
    setLoading(true);
    try {
      const response = await storeAPI.getByDistrict(district, type);
      setStores(response.data.stores);
    } catch (error) {
      console.error('Error getting stores:', error);
      alert(t('failedLoadRecommendations'));
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleStoreTypeFilter = (type) => {
    fetchStores(type);
  };

  const openMaps = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] container py-12 min-h-screen">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-green-700 mb-8">{t('storeRecommendation')}</h2>

        <div className="space-y-6">
          <div className="form-group">
            <label htmlFor="district" className="block mb-2 text-text-secondary font-medium">{t('selectDistrict')}</label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
              className="w-full px-3 py-3 border-2 border-pista-100 rounded-lg bg-pista-50 text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
            >
              <option value="">{t('selectDistrict')}</option>
              {karnatakaDistricts.map(dist => (
                <option key={dist.value} value={dist.value}>{dist.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="btn btn-primary"
              onClick={() => fetchStores()}
            >
              {t('allStores')}
            </button>
            {storeTypes.map(type => (
              <button
                key={type.value}
                className="btn btn-secondary"
                onClick={() => handleStoreTypeFilter(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading && <LoadingSpinner />}

      {stores.length > 0 && !loading && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">{t('nearbyStores')} {t('in')} {district}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store, index) => (
              <div key={store._id || index} className="bg-pista-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pista-100">
                <div className="mb-6 relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-br from-green-600 to-emerald-400 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {store.type}
                  </div>
                  {store.governmentApproved && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {t('govtApproved')}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-700">{store.name}</h3>

                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-secondary">{t('address')}:</span>
                      <span className="text-text-secondary">{store.address}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-secondary">{t('contact')}:</span>
                      <span className="text-text-secondary">{store.contact}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-secondary">{t('timing')}:</span>
                      <span className="text-text-secondary">{store.timing}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-secondary">{t('products')}:</span>
                      <span className="text-text-secondary">{store.products?.join(', ')}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <strong className="text-text-primary">{t('availableSeeds')}</strong>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {store.availableSeeds?.map((seed, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-pista-50 text-text-secondary rounded-full text-sm"
                        >
                          {seed}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">⭐ {store.rating}</span>
                    <span className="text-text-secondary">({store.reviews} {t('reviews')})</span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      className="flex-1 btn btn-primary text-sm"
                      onClick={() => openMaps(store.address)}
                    >
                      🗺️ {t('getDirections')}
                    </button>
                    <button
                      className="flex-1 btn btn-secondary text-sm"
                      onClick={() => window.open(`tel:${store.contact}`)}
                    >
                      📞 {t('callStore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stores.length === 0 && !loading && district && (
        <div className="p-8 bg-secondary-50 rounded-lg text-center">
          <p className="text-text-secondary">
            {t('noStoresInDistrict').replace('{district}', district) || `No stores found in ${district}. Try selecting a different district.`}
          </p>
        </div>
      )}

      {!district && (
        <div className="p-8 bg-secondary-50 rounded-lg text-center">
          <p className="text-text-secondary">{t('selectDistrictPrompt')}</p>
        </div>
      )}
    </div>
  );
};

export default StoreRecommendation;