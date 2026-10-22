import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, Search, PlusCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container py-5 text-center" style={{ minHeight: '65vh' }}>
      <div className="empty-state-box card-glass p-5 mx-auto my-5" style={{ maxWidth: '520px' }}>
        <div className="empty-icon text-accent mb-3">
          <Film size={64} />
        </div>
        <h1 className="display-4 fw-bold text-main mb-2">404</h1>
        <h2 className="h4 text-main mb-3">Page Not Found</h2>
        <p className="text-secondary mb-4" style={{ maxWidth: '420px', margin: '0 auto' }}>
          The scene you are looking for has been cut or does not exist. Let's get you back on track.
        </p>
        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
          <Link to="/" className="btn btn-nav-primary d-inline-flex align-items-center gap-2">
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/movies" className="btn btn-nav-outline d-inline-flex align-items-center gap-2">
            <Search size={16} /> Browse Movies
          </Link>
          <Link to="/add-movie" className="btn btn-add-movie d-inline-flex align-items-center gap-2">
            <PlusCircle size={16} /> Add Movie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
