import React from 'react';

const LoadingSpinner = ({ text = 'Loading movies...', fullPage = false, count = 12, asSkeleton = false }) => {
  if (asSkeleton) {
    return (
      <div className="movies-grid-container">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="movie-card skeleton-card">
            <div className="skeleton" style={{ width: '100%', aspectRatio: '2/3' }} />
            <div className="p-3">
              <div className="skeleton mb-2" style={{ height: '16px', width: '80%' }} />
              <div className="d-flex justify-content-between mt-2">
                <div className="skeleton" style={{ height: '12px', width: '30%' }} />
                <div className="skeleton" style={{ height: '12px', width: '30%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const spinnerContent = (
    <div className="text-center py-5">
      <div
        className="spinner-border text-accent"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-secondary">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
