import React from 'react';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

const MovieGrid = ({ movies = [], emptyMessage = 'No movies found.', emptyAction }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state-box card-glass p-5 my-3 text-center">
        <div className="empty-icon text-accent mb-3">
          <Film size={48} />
        </div>
        <h4 className="text-main mb-2 fw-bold">Nothing to show</h4>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '480px' }}>
          {emptyMessage}
        </p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="movies-grid-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
