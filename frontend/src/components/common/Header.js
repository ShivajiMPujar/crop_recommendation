import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Custom Link Component
  const CustomLink = ({ to, label, active, onClick }) => (
    <Link
      to={to}
      className={`text-white font-medium no-underline ml-0 lg:ml-5 transition-colors duration-300 ${active
        ? 'underline underline-offset-4 decoration-emerald-200 text-emerald-200'
        : 'hover:text-[#d1fae5]'
        }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );

  const getNavLinks = (role) => {
    const commonLinks = [
      { to: '/about', label: t('about') || 'About' },
    ];

    switch (role) {
      case 'worker':
        return [
          { to: '/worker/dashboard', label: t('dashboard') || 'Dashboard' },
          ...commonLinks,
        ];
      case 'farmer':
        return [
          { to: '/', label: t('home') || 'Home' },
          { to: '/recommendation', label: t('recommendations') || 'Recommendations' },
          { to: '/farmer/hire-worker', label: t('hireWorker') || 'Hire Worker' },
          { to: '/schemes', label: t('govtSchemes') || 'Govt Schemes' },
          ...commonLinks,
        ];
      case 'admin':
        return [
          { to: '/', label: t('home') || 'Home' },
          { to: '/recommendation', label: t('recommendations') || 'Recommendations' },
          { to: '/schemes', label: t('govtSchemes') || 'Govt Schemes' },
          ...commonLinks,
          { to: '/admin', label: t('admin') || 'Admin' },
        ];
      default:
        return [
          { to: '/', label: t('home') || 'Home' },
          ...commonLinks,
        ];
    }
  };

  if (!user) {
    // Header for non-logged-in users
    return (
      <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#0f766e] text-white shadow-md z-50">
        {/* Logo */}
        <h2 className="text-[1.5rem] font-bold tracking-wide">
          <Link to="/" className="text-white no-underline hover:text-emerald-200 transition-colors">
            🌾 {t('cropRecommendation')}
          </Link>
        </h2>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:items-center space-x-6">
          <CustomLink
            to="/"
            label={t('home') || 'Home'}
            active={location.pathname === '/'}
          />
          <CustomLink
            to="/about"
            label={t('about') || 'About'}
            active={location.pathname === '/about'}
          />

          <div className="flex items-center gap-4 ml-6 pl-6 border-l border-emerald-400">
            <LanguageSwitcher />
            <Link to="/login" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded transition-colors">
              {t('login') || 'Login'}
            </Link>
            <Link to="/register" className="bg-pista-50 text-emerald-800 hover:bg-emerald-50 font-medium px-4 py-2 rounded transition-colors">
              {t('register') || 'Register'}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white hover:text-emerald-200 transition-colors"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0d5d56] shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${location.pathname === '/'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {t('home') || 'Home'}
              </Link>
              <Link
                to="/about"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${location.pathname === '/about'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {t('about') || 'About'}
              </Link>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-emerald-400">
                <Link
                  to="/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded transition-colors text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('login') || 'Login'}
                </Link>
                <Link
                  to="/register"
                  className="bg-pista-50 text-emerald-800 hover:bg-emerald-50 font-medium px-4 py-2 rounded transition-colors text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('register') || 'Register'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }

  const navLinks = getNavLinks(user.role);

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#0f766e] text-white shadow-md z-50">
      {/* Logo */}
      <h2 className="text-[1.5rem] font-bold tracking-wide">
        <Link to="/" className="text-white no-underline hover:text-emerald-200 transition-colors">
          🌾 {t('cropRecommendation')}
        </Link>
      </h2>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex lg:items-center space-x-6">
        {navLinks.map((link) => (
          <CustomLink
            key={link.to}
            to={link.to}
            label={link.label}
            active={location.pathname === link.to}
          />
        ))}

        <div className="flex items-center gap-4 ml-6 pl-6 border-l border-emerald-400">
          <LanguageSwitcher />
          <Link
            to="/profile"
            className="text-emerald-200 font-medium hover:text-white transition-colors flex items-center gap-2"
          >
            <span>👤</span>
            {user.name}
          </Link>
          <button
            onClick={logout}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded transition-colors duration-300"
          >
            {t('logout') || 'Logout'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center gap-4">
        <LanguageSwitcher />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-white hover:text-emerald-200 transition-colors"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0d5d56] shadow-lg">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${location.pathname === link.to
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-emerald-400 mt-2 pt-2">
              <Link
                to="/profile"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors flex items-center gap-2 ${location.pathname === '/profile'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                <span>👤</span>
                {user.name}
              </Link>
            </div>

            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded transition-colors w-full mt-4"
            >
              {t('logout') || 'Logout'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;