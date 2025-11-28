import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestSchemes } from '../../services/schemeService';
import SchemeCard from './SchemeCard';
import { useLanguage } from '../../contexts/LanguageContext';

const HomeSchemesPreview = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const data = await getLatestSchemes(4);
                setSchemes(data);
            } catch (error) {
                console.error("Failed to fetch schemes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-6 md:px-24 bg-white">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (schemes.length === 0) return null;

    return (
        <section className="py-16 px-6 md:px-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('latestSchemes') || 'Latest Government Schemes'}
                    </h2>
                    <p className="text-gray-600">
                        {t('latestSchemesSource') || 'Sourced from Raita Mitra - Karnataka Agriculture Portal'}
                    </p>
                </div>
                <Link
                    to="/schemes"
                    className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-1 whitespace-nowrap"
                >
                    {t('viewAllSchemes') || 'View all schemes'} →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {schemes.map(scheme => (
                    <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
            </div>
        </section>
    );
};

export default HomeSchemesPreview;
