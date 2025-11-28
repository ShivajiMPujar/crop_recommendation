import React, { useEffect, useState } from 'react';
import { getSchemes } from '../services/schemeService';
import SchemeCard from '../components/schemes/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [filteredSchemes, setFilteredSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useLanguage();

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const data = await getSchemes();
                setSchemes(data);
                setFilteredSchemes(data);
            } catch (error) {
                console.error("Failed to fetch schemes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    useEffect(() => {
        const results = schemes.filter(scheme =>
            scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scheme.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchemes(results);
    }, [searchTerm, schemes]);

    return (
        <div className="font-poppins bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-[#0f766e] text-white py-16 px-6 md:px-24 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    {t('govtSchemesTitle') || 'Government Schemes for Farmers'}
                </h1>
                <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                    {t('govtSchemesSubtitle') || 'Explore the latest government initiatives designed to support and empower farmers.'}
                </p>
            </div>

            {/* Search and Content */}
            <div className="px-6 md:px-24 -mt-8">
                {/* Search Bar */}
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-12">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                        <input
                            type="text"
                            placeholder={t('searchSchemesPlaceholder') || "Search schemes by name or description..."}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredSchemes.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌾</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            {t('noSchemesFound') || 'No schemes found'}
                        </h3>
                        <p className="text-gray-500">
                            {t('tryAdjustingSearch') || 'Try adjusting your search terms.'}
                        </p>
                    </div>
                )}

                {/* Schemes Grid */}
                {!loading && filteredSchemes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSchemes.map(scheme => (
                            <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schemes;
