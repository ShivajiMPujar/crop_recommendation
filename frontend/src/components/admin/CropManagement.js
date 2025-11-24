import React, { useState, useEffect } from 'react';
import api, { getAuthHeaders } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';

const CropManagement = () => {
  const { t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    name: '',
    season: '',
    duration: '',
    waterNeeds: '',
    soilTypes: [],
    districts: [],
    minTemperature: '',
    maxTemperature: '',
    minRainfall: '',
    maxRainfall: '',
    fertilizers: '',
    yield: '',
    image: '',
    description: ''
  });
  const [editingCrop, setEditingCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCrops, setShowCrops] = useState(true);

  const soilOptions = [
    { value: 'Red Soil', label: t('redSoil') },
    { value: 'Black Soil', label: t('blackSoil') },
    { value: 'Alluvial Soil', label: t('alluvialSoil') },
    { value: 'Laterite Soil', label: t('lateriteSoil') },
    { value: 'Sandy Soil', label: t('sandySoil') },
    { value: 'Clay Soil', label: t('claySoil') }
  ];
  const districtOptions = [
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

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return { 'Authorization': `Bearer ${userData.token || ''}` };
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  // If no auth token, show a prompt in UI instead of attempting requests
  const authHeaders = getAuthHeaders();
  if (!authHeaders.Authorization) {
    return (
      <div className="p-8 text-center bg-pista-50 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">{t('notAuthenticated')}</h3>
        <p className="text-gray-600 mb-4">{t('loginAsAdminMsg')}</p>
        <a href="/admin-login" className="inline-block px-6 py-2 bg-primary-500 text-white rounded-lg">{t('goToAdminLogin')}</a>
      </div>
    );
  }

  const fetchCrops = async () => {
    try {
      const res = await api.get('/crops', { headers: getAuthHeaders() });
      const data = res.data;
      setCrops(Array.isArray(data) ? data : data.crops || []);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleSoilToggle = (soil) => {
    setNewCrop(prev => ({
      ...prev,
      soilTypes: prev.soilTypes.includes(soil)
        ? prev.soilTypes.filter(s => s !== soil)
        : [...prev.soilTypes, soil]
    }));
  };

  const handleDistrictToggle = (district) => {
    setNewCrop(prev => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter(d => d !== district)
        : [...prev.districts, district]
    }));
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...newCrop,
        fertilizers: newCrop.fertilizers.split(',').map(f => f.trim()).filter(Boolean),
        minTemperature: newCrop.minTemperature ? parseFloat(newCrop.minTemperature) : undefined,
        maxTemperature: newCrop.maxTemperature ? parseFloat(newCrop.maxTemperature) : undefined,
        minRainfall: newCrop.minRainfall ? parseFloat(newCrop.minRainfall) : undefined,
        maxRainfall: newCrop.maxRainfall ? parseFloat(newCrop.maxRainfall) : undefined
      };

      const res = await api.post('/crops', payload, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 201) {
        const crop = res.data;
        setCrops([...crops, crop]);
        setNewCrop({
          name: '', season: '', duration: '', waterNeeds: '', soilTypes: [], districts: [],
          minTemperature: '', maxTemperature: '', minRainfall: '', maxRainfall: '',
          fertilizers: '', yield: '', image: '', description: ''
        });
        alert(t('cropAddedSuccess'));
      } else {
        const err = await res.data;
        alert(`Error: ${err.error || 'Failed to add crop'}`);
      }
    } catch (error) {
      console.error('Error adding crop:', error);
      alert('Error adding crop');
    }
    setLoading(false);
  };

  const handleUpdateCrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...newCrop,
        fertilizers: newCrop.fertilizers.split(',').map(f => f.trim()).filter(Boolean),
        minTemperature: newCrop.minTemperature ? parseFloat(newCrop.minTemperature) : undefined,
        maxTemperature: newCrop.maxTemperature ? parseFloat(newCrop.maxTemperature) : undefined,
        minRainfall: newCrop.minRainfall ? parseFloat(newCrop.minRainfall) : undefined,
        maxRainfall: newCrop.maxRainfall ? parseFloat(newCrop.maxRainfall) : undefined
      };

      const res = await api.put(`/crops/${editingCrop._id}`, payload, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 200) {
        const updatedCrop = res.data;
        setCrops(crops.map(crop => crop._id === editingCrop._id ? updatedCrop : crop));
        setEditingCrop(null);
        setNewCrop({
          name: '', season: '', duration: '', waterNeeds: '', soilTypes: [], districts: [],
          minTemperature: '', maxTemperature: '', minRainfall: '', maxRainfall: '',
          fertilizers: '', yield: '', image: '', description: ''
        });
        alert(t('cropUpdateSuccess'));
      } else {
        alert('Error updating crop');
      }
    } catch (error) {
      console.error('Error updating crop:', error);
      alert('Error updating crop');
    }
    setLoading(false);
  };

  const handleDeleteCrop = async (id) => {
    if (window.confirm(t('confirmDeleteCrop'))) {
      try {
        const res = await api.delete(`/crops/${id}`, { headers: getAuthHeaders() });
        if (res.status === 200) {
          setCrops(crops.filter(crop => crop._id !== id));
          alert(t('cropDeleteSuccess'));
        }
      } catch (error) {
        console.error('Error deleting crop:', error);
        alert('Error deleting crop');
      }
    }
  };

  const handleEditCrop = (crop) => {
    setEditingCrop(crop);
    setNewCrop({
      name: crop.name || '',
      season: crop.season || '',
      duration: crop.duration || '',
      waterNeeds: crop.waterNeeds || '',
      soilTypes: crop.soilTypes || [],
      districts: crop.districts || [],
      minTemperature: crop.minTemperature || '',
      maxTemperature: crop.maxTemperature || '',
      minRainfall: crop.minRainfall || '',
      maxRainfall: crop.maxRainfall || '',
      fertilizers: Array.isArray(crop.fertilizers) ? crop.fertilizers.join(', ') : '',
      yield: crop.yield || '',
      image: crop.image || '',
      description: crop.description || ''
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🌱 {t('cropManagement')}</h2>
        <p className="text-gray-600">{t('manageCropDesc')}</p>
      </div>

      {/* Existing Crops Grid Display */}
      {crops.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{t('existingCrops')}</h3>
            <button
              onClick={() => setShowCrops(prev => !prev)}
              className="text-sm text-primary-600 hover:underline"
            >
              {showCrops ? t('showLess') : t('showMore')}
            </button>
          </div>
          {showCrops && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div key={crop._id} className="bg-pista-50 rounded-xl border border-pista-100 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Crop Image */}
                  {crop.image && (
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                      />
                    </div>
                  )}

                  {/* Crop Details */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{crop.name}</h4>

                    <div className="space-y-2 mb-4 text-sm">
                      {crop.season && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('season')}:</span>
                          <span className="text-gray-800">{crop.season}</span>
                        </div>
                      )}
                      {crop.duration && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('duration')}:</span>
                          <span className="text-gray-800">{crop.duration} {t('days')}</span>
                        </div>
                      )}
                      {crop.waterNeeds && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('waterNeeds')}:</span>
                          <span className="text-gray-800">{crop.waterNeeds}</span>
                        </div>
                      )}
                      {crop.minTemperature && crop.maxTemperature && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('temperature')}:</span>
                          <span className="text-gray-800">{crop.minTemperature}°C - {crop.maxTemperature}°C</span>
                        </div>
                      )}
                      {crop.minRainfall && crop.maxRainfall && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('rainfall')}:</span>
                          <span className="text-gray-800">{crop.minRainfall} - {crop.maxRainfall}mm</span>
                        </div>
                      )}
                      {crop.yield && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">{t('expectedYield')}:</span>
                          <span className="text-gray-800">{crop.yield}</span>
                        </div>
                      )}
                    </div>

                    {crop.soilTypes && crop.soilTypes.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">{t('soilTypeInfo')}:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {crop.soilTypes.map(soil => (
                            <span key={soil} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-lg">
                              {soil}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {crop.fertilizers && crop.fertilizers.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">{t('fertilizers')}:</span>
                        <p className="text-sm text-gray-700 mt-1">{crop.fertilizers.join(', ')}</p>
                      </div>
                    )}

                    {crop.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{crop.description}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEditCrop(crop)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        {t('edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-pista-50 p-6 rounded-2xl border-2 border-pista-100 mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6">{editingCrop ? t('edit') : t('addCropBtn')}</h3>
        <form onSubmit={editingCrop ? handleUpdateCrop : handleAddCrop} className="space-y-6">

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('cropNameLabel')} *</label>
              <input
                type="text"
                value={newCrop.name}
                onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                placeholder="e.g., Wheat"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('season')} *</label>
              <select
                value={newCrop.season}
                onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">{t('selectSeason')}</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Summer">Summer</option>
                <option value="All Season">All Season</option>
              </select>
            </div>
          </div>

          {/* Duration & Water */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('duration')} ({t('days')})</label>
              <input
                type="text"
                value={newCrop.duration}
                onChange={(e) => setNewCrop({ ...newCrop, duration: e.target.value })}
                placeholder="e.g., 120"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('waterNeeds')} *</label>
              <select
                value={newCrop.waterNeeds}
                onChange={(e) => setNewCrop({ ...newCrop, waterNeeds: e.target.value })}
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">{t('selectWaterNeeds')}</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Temperature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('minTemp')} (°C)</label>
              <input
                type="number"
                value={newCrop.minTemperature}
                onChange={(e) => setNewCrop({ ...newCrop, minTemperature: e.target.value })}
                placeholder="e.g., 15"
                step="0.1"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('maxTemp')} (°C)</label>
              <input
                type="number"
                value={newCrop.maxTemperature}
                onChange={(e) => setNewCrop({ ...newCrop, maxTemperature: e.target.value })}
                placeholder="e.g., 30"
                step="0.1"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Rainfall */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('minRainfall')} (mm)</label>
              <input
                type="number"
                value={newCrop.minRainfall}
                onChange={(e) => setNewCrop({ ...newCrop, minRainfall: e.target.value })}
                placeholder="e.g., 500"
                step="10"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('maxRainfall')} (mm)</label>
              <input
                type="number"
                value={newCrop.maxRainfall}
                onChange={(e) => setNewCrop({ ...newCrop, maxRainfall: e.target.value })}
                placeholder="e.g., 1000"
                step="10"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Soil Types */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">{t('soilTypeInfo')}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {soilOptions.map(soil => (
                <label key={soil.value} className="flex items-center gap-2 p-2 border-2 border-pista-100 rounded-lg bg-pista-50 cursor-pointer hover:border-primary-500">
                  <input
                    type="checkbox"
                    checked={newCrop.soilTypes.includes(soil.value)}
                    onChange={() => handleSoilToggle(soil.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-secondary">{soil.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Districts */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">{t('suitableDistricts')}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {districtOptions.map(district => (
                <label key={district.value} className="flex items-center gap-2 p-2 border-2 border-pista-100 rounded-lg bg-pista-50 cursor-pointer hover:border-primary-500">
                  <input
                    type="checkbox"
                    checked={newCrop.districts.includes(district.value)}
                    onChange={() => handleDistrictToggle(district.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-xs text-text-secondary">{district.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fertilizers & Yield */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('fertilizers')} ({t('fertilizersPlaceholder')})</label>
              <input
                type="text"
                value={newCrop.fertilizers}
                onChange={(e) => setNewCrop({ ...newCrop, fertilizers: e.target.value })}
                placeholder={t('fertilizersPlaceholder')}
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">{t('expectedYield')}</label>
              <input
                type="text"
                value={newCrop.yield}
                onChange={(e) => setNewCrop({ ...newCrop, yield: e.target.value })}
                placeholder="e.g., 50 quintal/acre"
                className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Image & Description */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">{t('imageURL')}</label>
            <input
              type="url"
              value={newCrop.image}
              onChange={(e) => setNewCrop({ ...newCrop, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">{t('cropDescription')}</label>
            <textarea
              value={newCrop.description}
              onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
              placeholder="Crop description and details"
              rows="3"
              className="w-full px-4 py-3 border-2 border-pista-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary px-6 py-3" disabled={loading}>
              {loading ? t('processing') : (editingCrop ? t('updateCrop') : t('addCropBtn'))}
            </button>
            {editingCrop && (
              <button
                type="button"
                className="btn btn-secondary px-6 py-3"
                onClick={() => {
                  setEditingCrop(null);
                  setNewCrop({
                    name: '', season: '', duration: '', waterNeeds: '', soilTypes: [], districts: [],
                    minTemperature: '', maxTemperature: '', minRainfall: '', maxRainfall: '',
                    fertilizers: '', yield: '', image: '', description: ''
                  });
                }}
              >
                {t('cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Crops table removed per admin request — list is available above in cards */}
    </div>
  );
};

export default CropManagement;