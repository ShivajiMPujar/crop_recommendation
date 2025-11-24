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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('nameRequired') || 'Name is required';
    if (!formData.email.trim()) newErrors.email = t('emailRequired') || 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('enterEmail') || 'Email is invalid';

    if (!formData.phone.trim()) newErrors.phone = t('phoneRequired') || 'Phone is required';
    if (!formData.region.trim()) newErrors.region = t('regionRequired') || 'Region is required';
    if (!formData.district.trim()) newErrors.district = t('districtRequired') || 'District is required';

    if (!formData.password) newErrors.password = t('passwordRequired') || 'Password is required';
    else if (formData.password.length < 6) newErrors.password = t('passwordLengthError') || 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordMatchError') || 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const data = await authService.register(registerData);

      if (data && data.user) {
        login({ ...data.user, token: data.token });
        navigate('/');
      } else {
        setErrors({ general: data.error || t('registrationFailed') });
      }
    } catch (err) {
      console.error('Registration error:', err);
      const message = err?.response?.data?.error || err.message || t('registrationError');
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] flex justify-center items-center py-8">
      <div className="bg-pista-50 p-8 rounded-xl shadow-lg w-full max-w-md border border-secondary-100">
        <h1 className="text-3xl font-bold mb-6 text-text-primary text-center">
          {t('register') || 'Register'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-text-secondary font-medium">{t('fullName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-secondary font-medium">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-secondary font-medium">{t('phone')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-text-secondary font-medium">{t('region')}</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder={t('regionPlaceholder')}
                className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
              />
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>
            <div>
              <label className="block mb-1 text-text-secondary font-medium">{t('district')}</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">{t('selectDistrict') || 'Select District'}</option>
                {karnatakaDistricts.map(dist => (
                  <option key={dist.value} value={dist.value}>{dist.label}</option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-text-secondary font-medium">{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 text-text-secondary font-medium">{t('confirmPassword')}</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-secondary-100 rounded-lg focus:outline-none focus:border-primary-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {errors.general && <div className="text-red-600 text-sm text-center">{errors.general}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary py-3 mt-4"
          >
            {isSubmitting ? (t('registering') || 'Registering...') : (t('register') || 'Register')}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-4">
          {t('alreadyAccount')} <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-700">{t('loginHere')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;