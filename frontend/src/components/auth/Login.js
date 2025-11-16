import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/auth';

const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

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

    // Call backend login
    authService.login({ email: formData.email, password: formData.password })
      .then((data) => {
        console.log('Login - Response data received:', data);
        if (data && data.user) {
          console.log('Login - Logging in user:', { ...data.user, token: data.token });
          login({ ...data.user, token: data.token });
          navigate('/');
        } else {
          setErrors({ general: data.error || 'Login failed' });
        }
      })
      .catch((err) => {
        console.log('Login - Error:', err);
        const message = err?.response?.data?.error || err.message || 'Login error';
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
    <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] flex justify-center items-center py-8">
      <div className="bg-pista-50 p-8 rounded-xl shadow-lg w-full max-w-sm border border-secondary-100">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center">
            User Login
          </div>
          <Link
            to="/admin-login"
            className="flex-1 text-center py-3 rounded-lg font-semibold text-text-secondary hover:bg-secondary-50 transition-colors"
          >
            Admin Login
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-text-primary">
          {t('login') || 'Login'}
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label className="block mb-2 text-text-secondary font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
            {t('login') || 'Login'}
          </button>
          {errors.general && <div className="text-red-600 text-sm mt-4 text-center">{errors.general}</div>}
        </form>
        <p className="text-center text-text-secondary">
          Don't have an account? <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-700">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;