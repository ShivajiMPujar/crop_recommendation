import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI } from '../../services/api';

const AdminLogin = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isAdminMode, setIsAdminMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Client-side validation
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log('Attempting admin login with:', { email: formData.email });

    // Call admin login
    adminAPI.login({ email: formData.email, password: formData.password })
      .then((response) => {
        console.log('Admin login response:', response);
        const data = response.data;
        if (data && data.success && data.user) {
          console.log('Admin login successful, user:', data.user);
          login({ ...data.user, token: data.token });
          navigate('/admin');
        } else {
          console.error('Admin login response invalid:', data);
          setErrors({ general: data.error || 'Admin login failed' });
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.error || err.message || 'Login error';
        console.error('Admin login error:', err);
        setErrors({ general: message });
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] py-8">
      <div className="bg-pista-50 p-8 rounded-xl shadow-lg w-full max-w-sm border border-secondary-100">
        <div className="flex gap-4 mb-6">
          <Link
            to="/login"
            className="flex-1 text-center py-3 rounded-lg font-semibold text-text-secondary hover:bg-secondary-50 transition-colors"
          >
            User Login
          </Link>
          <div className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center">
            Admin Login
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Admin Panel
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          Default Credentials: admin@gmail.com / admin123
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label className="block mb-2 text-text-secondary font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@gmail.com"
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.email && <div className="text-red-600 text-sm mt-2">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label className="block mb-2 text-text-secondary font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="admin123"
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.password && <div className="text-red-600 text-sm mt-2">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary py-3 mt-4"
            disabled={!formData.email || !formData.password}
          >
            Admin Login
          </button>
          {errors.general && <div className="text-red-600 text-sm mt-4 text-center">{errors.general}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
