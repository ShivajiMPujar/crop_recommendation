import React, { useState, useEffect } from 'react';
import api, { getAuthHeaders } from '../../services/api';

const SeedManagement = () => {
  const [seeds, setSeeds] = useState([]);
  const [newSeed, setNewSeed] = useState({
    name: '',
    crop: '',
    type: '',
    brand: '',
    pricePerKg: '',
    germinationRate: '',
    duration: '',
    specialFeatures: [],
    reliability: 0,
    notes: ''
  });
  const [editingSeed, setEditingSeed] = useState(null);
  const [loading, setLoading] = useState(false);

  const seedTypes = ['Hybrid', 'Traditional', 'High Yield', 'Disease Resistant', 'Drought Tolerant'];

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const res = await api.get('/seeds', { headers: getAuthHeaders() });
      const data = res.data;
      setSeeds(Array.isArray(data) ? data : data.seeds || []);
    } catch (err) {
      console.error('Error fetching seeds:', err);
    }
  };

  const authHeaders = getAuthHeaders();
  if (!authHeaders.Authorization) {
    return (
      <div className="p-8 text-center bg-pista-50 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Not authenticated</h3>
        <p className="text-gray-600 mb-4">Please login as admin to view and manage seeds.</p>
        <a href="/admin-login" className="inline-block px-6 py-2 bg-primary-500 text-white rounded-lg">Go to Admin Login</a>
      </div>
    );
  }

  const handleAddSeed = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        varietyName: newSeed.name,
        cropName: newSeed.crop,
        type: newSeed.type,
        brand: newSeed.brand,
        pricePerKg: newSeed.pricePerKg ? parseFloat(newSeed.pricePerKg) : undefined,
        germinationRate: newSeed.germinationRate,
        duration: newSeed.duration,
        specialFeatures: newSeed.specialFeatures,
        rating: newSeed.reliability ? Math.round(newSeed.reliability / 20) : undefined
      };

      const endpoint = editingSeed ? `/seeds/${editingSeed._id}` : '/seeds';
      const method = editingSeed ? 'put' : 'post';
      const res = await api[method](endpoint, payload, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      
      if (res.status === 201 || res.status === 200) {
        if (editingSeed) {
          setSeeds(seeds.map(s => s._id === editingSeed._id ? res.data : s));
          setEditingSeed(null);
        } else {
          setSeeds([...seeds, res.data]);
        }
        setNewSeed({
          name: '', crop: '', type: '', brand: '', pricePerKg: '', germinationRate: '',
          duration: '', specialFeatures: [], reliability: 0, notes: ''
        });
        alert(editingSeed ? 'Seed updated successfully!' : 'Seed added successfully!');
      }
    } catch (err) {
      console.error('Error adding/updating seed:', err);
      alert('Error saving seed');
    }
    setLoading(false);
  };

  const handleEditSeed = (seed) => {
    setEditingSeed(seed);
    setNewSeed({
      name: seed.varietyName || '',
      crop: seed.cropName || '',
      type: seed.type || '',
      brand: seed.brand || '',
      pricePerKg: seed.pricePerKg || '',
      germinationRate: seed.germinationRate || '',
      duration: seed.duration || '',
      specialFeatures: seed.specialFeatures || [],
      reliability: seed.rating ? seed.rating * 20 : 0,
      notes: ''
    });
  };

  const handleDeleteSeed = async (id) => {
    if (!window.confirm('Delete this seed brand?')) return;
    try {
      const res = await api.delete(`/seeds/${id}`, { headers: getAuthHeaders() });
      if (res.status === 200) setSeeds(seeds.filter(s => s._id !== id));
    } catch (err) {
      console.error('Error deleting seed:', err);
    }
  };

  const shortId = (id) => id ? id.toString().slice(-6) : '';

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🌾 Seed Management</h2>
        <p className="text-gray-600">Add, view and remove seed brands</p>
      </div>

      {/* Existing Seeds Grid Display */}
      {seeds.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Existing Seed Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seeds.map((seed) => (
              <div key={seed._id} className="bg-pista-50 rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Seed Header */}
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{seed.varietyName || seed.name}</h4>
                      <p className="text-sm opacity-90 font-medium">{seed.brand}</p>
                    </div>
                    <div className="text-xs opacity-90">ID: {shortId(seed._id)}</div>
                  </div>
                </div>

                {/* Seed Details */}
                <div className="p-6 space-y-3">
                  {seed.cropName && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">🌱 Crop:</span>
                      <span className="text-gray-800 text-sm">{seed.cropName}</span>
                    </div>
                  )}

                  {seed.type && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">🏷️ Type:</span>
                      <span className="text-gray-800 text-sm font-semibold">{seed.type}</span>
                    </div>
                  )}

                  {seed.pricePerKg && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">💰 Price:</span>
                      <span className="text-gray-800 text-sm">₹{seed.pricePerKg}/kg</span>
                    </div>
                  )}

                  {seed.germinationRate && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">🌱 Germination:</span>
                      <span className="text-gray-800 text-sm">{seed.germinationRate}%</span>
                    </div>
                  )}

                  {seed.duration && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">📅 Duration:</span>
                      <span className="text-gray-800 text-sm">{seed.duration} days</span>
                    </div>
                  )}

                  {seed.rating !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">⭐ Rating:</span>
                      <div className="w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-2 bg-primary-500" style={{ width: `${Math.max(0, Math.min(100, seed.rating * 20))}%` }} />
                      </div>
                      <span className="text-gray-800 font-semibold ml-2">{seed.rating}/5</span>
                    </div>
                  )}

                  {seed.createdAt && (
                    <div className="text-xs text-gray-500">Created: {new Date(seed.createdAt).toLocaleDateString()}</div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => handleEditSeed(seed)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSeed(seed._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Seed Form */}
      <div className="bg-pista-50 p-6 rounded-xl border-2 border-gray-200 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingSeed ? 'Edit Seed' : 'Add New Seed'}</h3>
        <form onSubmit={handleAddSeed} className="space-y-6">
          {/* Row 1: Name, Crop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Seed Name (Variety) *</label>
              <input
                value={newSeed.name}
                onChange={e => setNewSeed({...newSeed, name: e.target.value})}
                placeholder="e.g., Jaya"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Name *</label>
              <input
                value={newSeed.crop}
                onChange={e => setNewSeed({...newSeed, crop: e.target.value})}
                placeholder="e.g., Rice"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                required
              />
            </div>
          </div>

          {/* Row 2: Type, Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
              <select
                value={newSeed.type}
                onChange={e => setNewSeed({...newSeed, type: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">Select Type</option>
                {seedTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
              <input
                value={newSeed.brand}
                onChange={e => setNewSeed({...newSeed, brand: e.target.value})}
                placeholder="e.g., KSSCL"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Row 3: Price, Germination Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price per kg (₹)</label>
              <input
                type="number"
                value={newSeed.pricePerKg}
                onChange={e => setNewSeed({...newSeed, pricePerKg: e.target.value})}
                placeholder="e.g., 45"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Germination Rate (%)</label>
              <input
                value={newSeed.germinationRate}
                onChange={e => setNewSeed({...newSeed, germinationRate: e.target.value})}
                placeholder="e.g., 90-95"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Row 4: Duration, Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (days)</label>
              <input
                value={newSeed.duration}
                onChange={e => setNewSeed({...newSeed, duration: e.target.value})}
                placeholder="e.g., 125-130"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (Stars 0-5)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSeed.reliability}
                  onChange={e => setNewSeed({...newSeed, reliability: parseInt(e.target.value)})}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-gray-700 min-w-12">{(newSeed.reliability / 20).toFixed(1)}/5</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Saving...' : (editingSeed ? 'Update Seed' : 'Add Seed Brand')}
            </button>
            {editingSeed && (
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => {
                  setEditingSeed(null);
                  setNewSeed({
                    name: '', crop: '', type: '', brand: '', pricePerKg: '', germinationRate: '',
                    duration: '', specialFeatures: [], reliability: 0, notes: ''
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeedManagement;
