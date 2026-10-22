import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Bookmark, Film, Trash2, Sparkles } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { toggleFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice';
import { toggleWatchlist, selectIsInWatchlist } from '../redux/slices/watchlistSlice';
import { deleteCustomMovie } from '../redux/slices/moviesSlice';
import { getPosterUrl } from '../utils/constants';

const MovieCard = ({ movie }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isFav = useAppSelector((state) => selectIsFavorite(state, movie?.id));
  const isWatch = useAppSelector((state) => selectIsInWatchlist(state, movie?.id));

  if (!movie) return null;

  const posterUrl = !imgError && movie.poster_path ? getPosterUrl(movie.poster_path) : null;
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'NR';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    dispatch(toggleFavorite(movie));
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    dispatch(toggleWatchlist(movie));
  };

  const handleDeleteCustomClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      dispatch(deleteCustomMovie(movie.id));
    }
  };

  return (
    <div className={`movie-card ${movie.isCustom ? 'custom-movie-card' : ''}`}>
      <Link to={`/movie/${movie.id}`} className="text-decoration-none">
        <div className="movie-poster-wrapper">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title || 'Movie'} Poster`}
              className="movie-poster-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="poster-fallback">
              <Film size={36} />
              <span>{movie.title || 'No Poster'}</span>
            </div>
          )}

          {/* Custom movie badge */}
          {movie.isCustom && (
            <div className="custom-card-badge" title="Added by you">
              <Sparkles size={11} />
              <span>Custom</span>
            </div>
          )}

          {/* Rating Pill */}
          <div className="rating-pill" title={`Rating: ${rating}/10`}>
            <Star size={12} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
            <span>{rating}</span>
          </div>

          {/* Action overlay */}
          <div className="card-overlay-actions">
            {movie.isCustom && (
              <button
                type="button"
                className="action-icon-btn action-delete-btn"
                onClick={handleDeleteCustomClick}
                title="Delete this added movie"
                aria-label="Delete this added movie"
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              type="button"
              className={`action-icon-btn ${isFav ? 'active-favorite' : ''}`}
              onClick={handleFavoriteClick}
              title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              aria-label={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart size={15} fill={isFav ? '#FFFFFF' : 'none'} />
            </button>
            <button
              type="button"
              className={`action-icon-btn ${isWatch ? 'active-watchlist' : ''}`}
              onClick={handleWatchlistClick}
              title={isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
              aria-label={isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark size={15} fill={isWatch ? '#FFFFFF' : 'none'} />
            </button>
          </div>
        </div>

        <div className="movie-card-body">
          <h3 className="movie-card-title" title={movie.title}>
            {movie.title}
          </h3>
          <div className="movie-card-info">
            <span className="movie-card-year">{releaseYear}</span>
            <span className="movie-card-tag">
              {movie.isCustom ? 'My Movie' : 'Movie'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
