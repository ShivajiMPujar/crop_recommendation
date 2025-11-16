import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="loading-spinner"></div>
      <span className="ml-4 text-text-secondary">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
