import React, { useState } from 'react';
import CropManagement from './CropManagement';
import StoreManagement from './StoreManagement';
import SeedManagement from './SeedManagement';

const AddContent = ({ initialTab = 'cards' }) => {
  const [active, setActive] = useState(initialTab);

  const items = [
    { id: 'crop', label: 'Crops', icon: '🌱' },
    { id: 'store', label: 'Stores', icon: '🏬' },
    { id: 'seed', label: 'Seeds', icon: '🌾' }
  ];

  if (active === 'cards') {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Content</h2>
          <p className="text-gray-600">Select what you want to add to the system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Crop Card */}
          <div
            onClick={() => setActive('crop')}
            className="bg-pista-50 border-2 border-gray-200 rounded-xl p-8 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all duration-300 text-center"
          >
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add Crop</h3>
            <p className="text-gray-600">Add new crop data with requirements</p>
          </div>

          {/* Add Store Card */}
          <div
            onClick={() => setActive('store')}
            className="bg-pista-50 border-2 border-gray-200 rounded-xl p-8 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all duration-300 text-center"
          >
            <div className="text-6xl mb-4">🏬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add Store</h3>
            <p className="text-gray-600">Add agricultural stores with contact info</p>
          </div>

          {/* Add Seed Card */}
          <div
            onClick={() => setActive('seed')}
            className="bg-pista-50 border-2 border-gray-200 rounded-xl p-8 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all duration-300 text-center"
          >
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add Seed</h3>
            <p className="text-gray-600">Add seed brands with reliability scores</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs Header */}
      <div className="mb-6 flex gap-3 border-b-2 border-gray-200 pb-4 flex-wrap">
        <button
          onClick={() => setActive('cards')}
          className="px-4 py-2 rounded-lg font-semibold transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          ← Back to All
        </button>
        {items.map(it => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              active === it.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">{it.icon}</span>{it.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div>
        {active === 'crop' && <CropManagement />}
        {active === 'store' && <StoreManagement />}
        {active === 'seed' && <SeedManagement />}
      </div>
    </div>
  );
};

export default AddContent;
