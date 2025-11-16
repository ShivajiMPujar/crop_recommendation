import React, { useState, useEffect } from 'react';
import { adminAPI, getAuthHeaders } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers({ headers: getAuthHeaders() });
      const data = res.data;
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    setLoading(true);
    try {
      const res = await adminAPI.updateUserStatus(userId, { status: newStatus }, { headers: { 'Content-Type': 'application/json', ...getAuthHeaders() } });
      if (res.status === 200) {
        setUsers(users.map(user => user._id === userId ? { ...user, status: newStatus } : user));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await adminAPI.deleteUser(userId, { headers: getAuthHeaders() });
        if (res.status === 200) setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      {/* Header with Title and Action Buttons */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Registered Users</h2>
        
        {/* Stats Badge */}
        <div className="text-sm text-gray-600 font-medium mb-6">
          Total Users: <span className="text-lg font-bold text-gray-900">{users.length}</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-pista-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Phone</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Location</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Role</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.phone || 'N/A'}</td>
                {/* Show location only if the user has any recommendation-related data */}
                <td className="px-6 py-4 text-gray-600">
                  {(
                    (user.totalRecommendations && user.totalRecommendations > 0) ||
                    (user.recommendations && user.recommendations.length > 0) ||
                    user.hasRecommendations
                  ) ? (
                    user.location || `${user.region || ''}${user.district ? (user.region ? ', ' : '') + user.district : ''}` || 'N/A'
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-yellow-100 text-yellow-800' :
                    user.role === 'farmer' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;