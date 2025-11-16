import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRecommendationClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="font-poppins bg-gradient-to-b from-[#abcba9] to-[#E7F5F2] text-gray-900">
      {/* 🌱 Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-24 py-20">
        {/* Left Side */}
        <div className="max-w-xl">
          <div className="inline-block bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-full mb-5 text-sm">
            🌱 Smart Farming Technology
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4">
            {t('heroTitle')}
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/recommendation"
              onClick={handleRecommendationClick}
              className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 text-center"
            >
              {t('getStarted')} →
            </Link>
            <Link
              to="/recommendation"
              onClick={handleRecommendationClick}
              className="bg-pista-50 border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-300 text-center"
            >
              {t('storeTab')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-10 mt-12 text-center">
            <div>
              <h2 className="text-3xl font-bold text-green-700">500+</h2>
              <p className="text-gray-700">Crop Varieties</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-700">1000+</h2>
              <p className="text-gray-700">Stores Listed</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-700">50+</h2>
              <p className="text-gray-700">Regions Covered</p>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="mt-12 md:mt-0 md:ml-10">
          <img
            src="https://images.prismic.io/goldstandard/65dfa7029c42d04f7d9698dc_cover_crops_soc.jpg?auto=format,compress"
            alt="Crop Field"
            className="w-full md:w-[700px] rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* 🌾 Why Choose Section */}
      <section className="bg-gradient-to-tr from-[#fefffe] to-[#a0d3c7] text-center py-20 px-6 md:px-24">
        <h2 className="text-3xl font-bold mb-3">Why Choose Our Platform?</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Empowering farmers with technology for better crop management
        </p>

        {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-pista-50 p-6 rounded-xl shadow-md hover:-translate-y-1 transition transform duration-300">
            <span className="text-3xl">🌾</span>
            <h3 className="text-lg font-semibold mt-3">
              Smart Recommendations
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              AI-powered suggestions based on soil, climate, and regional data.
            </p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md hover:-translate-y-1 transition transform duration-300">
            <span className="text-3xl">📍</span>
            <h3 className="text-lg font-semibold mt-3">Store Locator</h3>
            <p className="text-gray-600 text-sm mt-2">
              Find trusted agricultural stores near you with verified reviews.
            </p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md hover:-translate-y-1 transition transform duration-300">
            <span className="text-3xl">📈</span>
            <h3 className="text-lg font-semibold mt-3">Maximize Yield</h3>
            <p className="text-gray-600 text-sm mt-2">
              Optimize crop selection to increase productivity and profits.
            </p>
          </div>
          <div className="bg-pista-50 p-6 rounded-xl shadow-md hover:-translate-y-1 transition transform duration-300">
            <span className="text-3xl">🔒</span>
            <h3 className="text-lg font-semibold mt-3">Trusted Data</h3>
            <p className="text-gray-600 text-sm mt-2">
              Backed by agricultural research and real farmer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 🌱 Call To Action Section */}
      <section className="bg-gradient-to-r from-green-900 to-emerald-400 text-center text-white py-20 px-6 rounded-2xl w-[90%] md:w-[80%] mx-auto my-24 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join thousands of farmers making smarter crop decisions every day.
        </p>
          <Link
          to="/recommendation"
          onClick={handleRecommendationClick}
          className="bg-pista-50 text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition duration-300"
        >
          Get Your Recommendation →
        </Link>
      </section>

      {/* 🌾 Footer */}
      <footer className="bg-green-50 text-green-800 text-center py-5 border-t border-green-100 font-medium">
        © {new Date().getFullYear()} Crop Recommendation System — All Rights Reserved 🌾
      </footer>
    </div>
  );
}

export default Home;