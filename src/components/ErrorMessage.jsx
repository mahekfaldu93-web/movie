import React from 'react';
import { AlertCircle, RefreshCw, KeyRound, ExternalLink } from 'lucide-react';

const ErrorMessage = ({ message, onRetry, title = 'Unable to Load Content' }) => {
  const isKeyIssue =
    typeof message === 'string' &&
    (message.toLowerCase().includes('api key') ||
      message.toLowerCase().includes('unauthorized') ||
      message.toLowerCase().includes('missing_api_key') ||
      message.toLowerCase().includes('401'));

  if (isKeyIssue) {
    return (
      <div className="card-glass p-4 my-4">
        <div className="d-flex align-items-start gap-3">
          <div
            className="p-3 rounded-circle"
            style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--accent-primary)' }}
          >
            <KeyRound size={28} />
          </div>
          <div className="flex-grow-1">
            <h4 className="text-main mb-2 fw-bold">TMDB API Key Required</h4>
            <p className="text-secondary mb-3">
              To fetch live online movie data, CineVault can connect to The Movie Database (TMDB) API Key, or use your custom added movies and authentic offline catalog.
            </p>
            <div
              className="p-3 rounded mb-3"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)' }}
            >
              <h6 className="text-main fw-semibold mb-2">Quick Setup Guide:</h6>
              <ol className="text-secondary ps-3 mb-0 small">
                <li className="mb-1">
                  Create a free account at{' '}
                  <a
                    href="https://www.themoviedb.org/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent fw-semibold"
                  >
                    themoviedb.org <ExternalLink size={12} className="inline ms-1" />
                  </a>
                </li>
                <li className="mb-1">
                  Navigate to <strong>Settings &gt; API</strong> and generate a Developer API key (v3).
                </li>
                <li className="mb-1">
                  Open the <code>.env</code> file in the project root and insert your key:
                  <div className="mt-1 bg-dark p-2 rounded text-light font-monospace small">
                    VITE_TMDB_API_KEY=your_actual_32_character_tmdb_key_here
                  </div>
                </li>
                <li>Save the file and restart the development server (<code>npm run dev</code>).</li>
              </ol>
            </div>
            {onRetry && (
              <button onClick={onRetry} className="btn btn-sm btn-nav-primary d-inline-flex align-items-center gap-2">
                <RefreshCw size={15} /> Check Again / Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="empty-state-box card-glass p-5 my-4 text-center">
      <div className="empty-icon text-danger mb-3">
        <AlertCircle size={48} className="text-danger" />
      </div>
      <h4 className="text-main mb-2 fw-bold">{title}</h4>
      <p className="text-secondary mb-4">{message || 'An unexpected error occurred while communicating with the movie service.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-nav-primary d-inline-flex align-items-center gap-2">
          <RefreshCw size={16} /> Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
