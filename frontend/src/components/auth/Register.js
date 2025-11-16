import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/auth';

const Register = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    district: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    authService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      region: formData.region,
      district: formData.district
    }).then((data) => {
      console.log('Register - Response data received:', data);
      if (data && data.user) {
        console.log('Register - Logging in user:', { ...data.user, token: data.token });
        login({ ...data.user, token: data.token });
        navigate('/home');
      } else {
        setErrors({ general: data.error || 'Registration failed' });
      }
    }).catch((err) => {
      console.log('Register - Error:', err);
      const message = err?.response?.data?.error || err.message || 'Registration error';
      setErrors({ general: message });
    }).finally(() => setSubmitting(false));
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
        <h1 className="text-3xl font-bold mb-6 text-text-primary">
          {t('register') || 'Register'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block mb-2 text-text-secondary font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.name && <div className="text-red-600 text-sm mt-2">{errors.name}</div>}
          </div>
          <div className="form-group mb-4">
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
          <div className="form-group mb-4">
            <label className="block mb-2 text-text-secondary font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.phone && <div className="text-red-600 text-sm mt-2">{errors.phone}</div>}
          </div>
          <div className="form-group mb-4">
            <label className="block mb-2 text-text-secondary font-medium">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="e.g., North Karnataka"
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.region && <div className="text-red-600 text-sm mt-2">{errors.region}</div>}
          </div>
          <div className="form-group mb-4">
            <label className="block mb-2 text-text-secondary font-medium">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g., Dharwad"
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.district && <div className="text-red-600 text-sm mt-2">{errors.district}</div>}
          </div>
          <div className="form-group mb-4">
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
          <div className="form-group mb-4">
            <label className="block mb-2 text-text-secondary font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-primary-500"
              required
            />
            {errors.confirmPassword && <div className="text-red-600 text-sm mt-2">{errors.confirmPassword}</div>}
          </div>
          {errors.general && <div className="text-red-600 text-sm text-center mb-4">{errors.general}</div>}
          <button 
            type="submit" 
            className="w-full btn btn-primary py-3 mt-4" 
            disabled={submitting}
          >
            {submitting ? 'Registering...' : (t('register') || 'Register')}
          </button>
        </form>
        <p className="text-center text-text-secondary mt-6">
          Already have an account? <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-700">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;