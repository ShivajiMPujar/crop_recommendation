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
  const CustomLink = ({ to, label, active }) => (
    <Link
      to={to}
      className={`text-white font-medium no-underline ml-0 md:ml-5 transition-colors duration-300 ${
        active
          ? 'underline underline-offset-4 decoration-emerald-200 text-emerald-200'
          : 'hover:text-[#d1fae5]'
      }`}
    >
      {label}
    </Link>
  );

  if (!user) {
    // Header for non-logged-in users
    return (
      <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#0f766e] text-white shadow-md z-50">
        {/* Logo */}
        <h2 className="text-[1.5rem] font-bold tracking-wide">
          <Link to="/" className="text-white no-underline hover:text-emerald-200 transition-colors">
            🌾 Crop Recommendation
          </Link>
        </h2>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center space-x-6">
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
        <div className="md:hidden flex items-center gap-4">
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
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0d5d56] shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="/"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                  location.pathname === '/'
                    ? 'bg-emerald-600 text-emerald-200'
                    : 'hover:bg-[#0f766e]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {t('home') || 'Home'}
              </Link>
              <Link
                to="/about"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                  location.pathname === '/about'
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

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-[#0f766e] text-white shadow-md z-50">
      {/* Logo */}
      <h2 className="text-[1.5rem] font-bold tracking-wide">
        <Link to="/" className="text-white no-underline hover:text-emerald-200 transition-colors">
          🌾 Crop Recommendation
        </Link>
      </h2>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex md:items-center space-x-6">
        <CustomLink 
          to="/" 
          label={t('home') || 'Home'} 
          active={location.pathname === '/'} 
        />
        <CustomLink
          to="/recommendation"
          label={t('recommendation') || 'Recommendations'}
          active={location.pathname === '/recommendation'}
        />
        <CustomLink
          to="/about"
          label={t('about') || 'About'}
          active={location.pathname === '/about'}
        />
        {user && user.role === 'admin' && (
          <CustomLink
            to="/admin"
            label={t('admin') || 'Admin'}
            active={location.pathname === '/admin'}
          />
        )}
        
        <div className="flex items-center gap-4 ml-6 pl-6 border-l border-emerald-400">
          <LanguageSwitcher />
          <Link
            to="/profile"
            className="text-emerald-200 font-medium hover:text-white transition-colors"
          >
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
      <div className="md:hidden flex items-center gap-4">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0d5d56] shadow-lg">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                location.pathname === '/'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('home') || 'Home'}
            </Link>
            <Link
              to="/recommendation"
              className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                location.pathname === '/recommendation'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('recommendation') || 'Recommendations'}
            </Link>
            <Link
              to="/about"
              className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                location.pathname === '/about'
                  ? 'bg-emerald-600 text-emerald-200'
                  : 'hover:bg-[#0f766e]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('about') || 'About'}
            </Link>
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-white font-medium no-underline py-2 px-3 rounded transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-emerald-600 text-emerald-200'
                    : 'hover:bg-[#0f766e]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {t('admin') || 'Admin'}
              </Link>
            )}
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