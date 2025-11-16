import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import UserManagement from './UserManagement';
import AddContent from './AddContent';
import { adminAPI, getAuthHeaders } from '../../services/api';

const Dashboard = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const res = await adminAPI.getStats({ headers: getAuthHeaders() });
      const data = res.data;
      setStats(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/admin-login';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'addContent':
        return <AddContent />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2]">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            🌾 {t('adminDashboard')}
          </h1>
          <button 
            onClick={handleLogout}
            className="bg-pista-50 text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-pista-100 transition-colors"
          >
            {t('logout')}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-pista-50 p-6 rounded-xl shadow-md border-l-4 border-primary-500">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">{t('totalUsers')}</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">{t('totalCrops')}</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.totalCrops || 0}</p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">{t('totalStores')}</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.totalStores || 0}</p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-sm uppercase font-semibold mb-2">{t('seedsStat')}</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.totalSeeds || 0}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'users'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-pista-50 text-gray-700 border-2 border-pista-100 hover:border-primary-500'
            }`}
          >
            <span className="text-2xl">👥</span>
            <span>{t('users')}</span>
          </button>
          <button
            onClick={() => setActiveTab('addContent')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'addContent'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-pista-50 text-gray-700 border-2 border-pista-100 hover:border-primary-500'
            }`}
          >
            <span className="text-2xl">➕</span>
            <span>{t('manageContent')}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-pista-50 rounded-xl shadow-md p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;