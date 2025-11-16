import React, { useState, useEffect } from 'react';
import api, { getAuthHeaders } from '../../services/api';

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({
    name: '',
    owner: '',
    location: '',
    contact: '',
    products: [],
    coordinates: { latitude: '', longitude: '' }
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [showStores, setShowStores] = useState(true);

  const productOptions = ['Seeds', 'Fertilizers', 'Pesticides', 'Tools', 'Equipment', 'Irrigation'];

  // use getAuthHeaders() from services/api

  useEffect(() => {
    fetchStores();
  }, []);

  const authHeaders = getAuthHeaders();
  if (!authHeaders.Authorization) {
    return (
      <div className="p-8 text-center bg-pista-50 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Not authenticated</h3>
        <p className="text-gray-600 mb-4">Please login as admin to view and manage stores.</p>
        <a href="/admin-login" className="inline-block px-6 py-2 bg-primary-500 text-white rounded-lg">Go to Admin Login</a>
      </div>
    );
  }

  const fetchStores = async () => {
    try {
      const res = await api.get('/stores', { headers: getAuthHeaders() });
      const data = res.data;
      setStores(Array.isArray(data) ? data : data.stores || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Map frontend fields to backend Store schema: district required, coordinates use lat/lng
      const storeData = {
        name: newStore.name,
        address: newStore.address || newStore.location || '',
        district: newStore.district || newStore.location || '',
        contact: newStore.contact,
        owner: newStore.owner,
        products: selectedProducts,
        coordinates: {
          lat: newStore.coordinates.latitude ? parseFloat(newStore.coordinates.latitude) : undefined,
          lng: newStore.coordinates.longitude ? parseFloat(newStore.coordinates.longitude) : undefined
        }
      };

      const res = await api.post('/stores', storeData, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 201) {
        const store = res.data;
        setStores([...stores, store]);
        setNewStore({
          name: '', owner: '', location: '', contact: '', 
          products: [], coordinates: { latitude: '', longitude: '' }
        });
        setSelectedProducts([]);
        alert('Store added successfully!');
      }
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Error adding store');
    }
    setLoading(false);
  };

  const handleUpdateStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storeData = {
        name: newStore.name,
        address: newStore.address || newStore.location || '',
        district: newStore.district || newStore.location || '',
        contact: newStore.contact,
        owner: newStore.owner,
        products: selectedProducts,
        coordinates: {
          lat: newStore.coordinates.latitude ? parseFloat(newStore.coordinates.latitude) : undefined,
          lng: newStore.coordinates.longitude ? parseFloat(newStore.coordinates.longitude) : undefined
        }
      };

      const res = await api.put(`/stores/${editingStore._id}`, storeData, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 200) {
        const updatedStore = res.data;
        setStores(stores.map(store => store._id === editingStore._id ? updatedStore : store));
        setEditingStore(null);
        setNewStore({
          name: '', owner: '', location: '', contact: '', 
          products: [], coordinates: { latitude: '', longitude: '' }
        });
        setSelectedProducts([]);
        alert('Store updated successfully!');
      }
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Error updating store');
    }
    setLoading(false);
  };

  const handleEditStore = (store) => {
    setEditingStore(store);
    setNewStore({
      name: store.name || '',
      owner: store.owner || '',
      location: store.district || store.address || store.location || '',
      contact: store.contact || '',
      products: store.products || [],
      coordinates: {
        latitude: store.coordinates?.lat || store.coordinates?.latitude || '',
        longitude: store.coordinates?.lng || store.coordinates?.longitude || ''
      }
    });
    setSelectedProducts(store.products || []);
  };

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleStatusChange = async (storeId, newStatus) => {
    setLoading(true);
    try {
      const res = await api.put(`/stores/${storeId}/status`, { status: newStatus }, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 200) {
        setStores(stores.map(store => store._id === storeId ? { ...store, status: newStatus } : store));
      }
    } catch (error) {
      console.error('Error updating store status:', error);
    }
    setLoading(false);
  };

  const handleDeleteStore = async (storeId) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        const res = await api.delete(`/stores/${storeId}`, { headers: getAuthHeaders() });
        if (res.status === 200) {
          setStores(stores.filter(store => store._id !== storeId));
          alert('Store deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting store:', error);
        alert('Error deleting store');
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🏬 Store Management</h2>
        <p className="text-gray-600">Manage agricultural stores and suppliers</p>
      </div>

      {/* Existing Stores Grid Display */}
      {stores.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Existing Stores</h3>
            <button
              onClick={() => setShowStores(prev => !prev)}
              className="text-sm text-primary-600 hover:underline"
            >
              {showStores ? 'Show less' : 'Show more'}
            </button>
          </div>
          {showStores && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => (
                <div key={store._id} className="bg-pista-50 rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Store Header */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-white">
                  <h4 className="text-xl font-bold mb-1">{store.name}</h4>
                  <p className="text-sm opacity-90">{store.owner}</p>
                </div>

                {/* Store Details */}
                <div className="p-6 space-y-3">
                  {store.location && (
                    <div>
                      <span className="font-medium text-gray-600 text-sm">📍 Location:</span>
                      <p className="text-gray-800 text-sm mt-1">{store.location}</p>
                    </div>
                  )}

                  {store.contact && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-600 text-sm">📞 Contact:</span>
                      <span className="text-gray-800 text-sm">{store.contact}</span>
                    </div>
                  )}

                  {store.products && store.products.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-600 text-sm">📦 Products:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {store.products.map(product => (
                          <span key={product} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {store.coordinates && (store.coordinates.latitude || store.coordinates.longitude) && (
                    <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                      📍 {store.coordinates.lat || store.coordinates.latitude}, {store.coordinates.lng || store.coordinates.longitude}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditStore(store)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStore(store._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Store Form */}
      <div className="bg-pista-50 p-6 rounded-2xl border-2 border-secondary-100 mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-6">{editingStore ? 'Edit Store' : 'Add New Store'}</h3>
        <form onSubmit={editingStore ? handleUpdateStore : handleAddStore} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Store Name"
              value={newStore.name}
              onChange={(e) => setNewStore({...newStore, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-pista-50 focus:outline-none focus:border-primary-500"
              required
            />
            <input
              type="text"
              placeholder="Owner Name"
              value={newStore.owner}
              onChange={(e) => setNewStore({...newStore, owner: e.target.value})}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-pista-50 focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={newStore.location}
              onChange={(e) => setNewStore({...newStore, location: e.target.value})}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-pista-50 focus:outline-none focus:border-primary-500"
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={newStore.contact}
              onChange={(e) => setNewStore({...newStore, contact: e.target.value})}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={newStore.coordinates.latitude}
              onChange={(e) => setNewStore({
                ...newStore, 
                coordinates: {...newStore.coordinates, latitude: e.target.value}
              })}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={newStore.coordinates.longitude}
              onChange={(e) => setNewStore({
                ...newStore, 
                coordinates: {...newStore.coordinates, longitude: e.target.value}
              })}
              className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg bg-white focus:outline-none focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-lg font-semibold text-text-secondary mb-4">Products Available</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {productOptions.map(product => (
                <label key={product} className="flex items-center gap-2 p-3 border-2 border-secondary-100 rounded-lg bg-pista-50 cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product)}
                    onChange={() => handleProductToggle(product)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-text-secondary font-medium">{product}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary px-6 py-3 mt-4" disabled={loading}>
            {loading ? 'Processing...' : (editingStore ? 'Update Store' : 'Add Store')}
          </button>
          {editingStore && (
            <button
              type="button"
              className="btn btn-secondary px-6 py-3 mt-4"
              onClick={() => {
                setEditingStore(null);
                setNewStore({
                  name: '', owner: '', location: '', contact: '', 
                  products: [], coordinates: { latitude: '', longitude: '' }
                });
                setSelectedProducts([]);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Stores table removed per admin request — list is available above in cards */}
    </div>
  );
};

export default StoreManagement;