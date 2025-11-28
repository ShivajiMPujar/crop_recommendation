import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const SchemeCard = ({ scheme }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {scheme.title}
                </h3>
                {scheme.type && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {scheme.type}
                    </span>
                )}
            </div>

            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {scheme.shortDescription}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {new Date(scheme.publishedDate).toLocaleDateString()}
                </span>
                <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center gap-1"
                >
                    {t('knowMore') || 'Know more'} ↗
                </a>
            </div>
        </div>
    );
};

export default SchemeCard;
