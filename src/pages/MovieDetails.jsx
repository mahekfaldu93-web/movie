
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const favorites = useAppSelector(
    (state) => state.favorites
  );

  const favoriteIds = Array.isArray(favorites?.ids)
    ? favorites.ids.map(String)
    : [];

  const isFavorite = favoriteIds.includes(String(id));

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovie() {
      try {
        setLoading(true);
        setError('');

        if (!API_KEY) {
          throw new Error(
            'TMDB API key missing. Check your .env file.'
          );
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            'Movie not found or API request failed.'
          );
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load movie.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadMovie();
    } else {
      setError('Movie ID is missing.');
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container py-5 text-center">
        <h2>Unable to load movie</h2>
        <p>{error || 'Movie not found.'}</p>
        <Link to="/movies" className="btn btn-primary">
          Back to Movies
        </Link>
      </div>
    );
  }

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="container py-4">
      <Link
        to="/movies"
        className="btn btn-outline-secondary mb-4"
      >
        <ArrowLeft size={16} className="me-2" />
        Back to Movies
      </Link>

      <div
        className="rounded-4 p-4 p-md-5 text-white"
        style={{
          background: backdrop
            ? `linear-gradient(rgba(5,12,28,.88), rgba(5,12,28,.96)), url("${backdrop}") center/cover`
            : '#0b1730',
        }}
      >
        <div className="row g-4 align-items-start">
          <div className="col-12 col-md-4 col-lg-3">
            {poster ? (
              <img
                src={poster}
                alt={movie.title}
                className="img-fluid rounded-3 shadow"
              />
            ) : (
              <div className="p-5 bg-secondary rounded-3">
                No poster available
              </div>
            )}
          </div>

          <div className="col-12 col-md-8 col-lg-9">
            <h1 className="fw-bold mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="fst-italic text-light">
                {movie.tagline}
              </p>
            )}

            <div className="d-flex flex-wrap gap-3 mb-3">
              <span>
                <Star
                  size={17}
                  className="text-warning me-1"
                />
                {Number(movie.vote_average || 0).toFixed(1)}/10
              </span>

              <span>
                {movie.release_date || 'Release date unavailable'}
              </span>

              <span>
                {movie.runtime
                  ? `${movie.runtime} minutes`
                  : 'Runtime unavailable'}
              </span>
            </div>

            <h4>Overview</h4>
            <p className="text-light">
              {movie.overview || 'No overview available.'}
            </p>

            <h5 className="mt-4">Genres</h5>
            <div className="d-flex flex-wrap gap-2">
              {(movie.genres || []).map((genre) => (
                <span
                  key={genre.id}
                  className="badge bg-secondary p-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <span className="me-2">
                <Heart
                  size={18}
                  fill={isFavorite ? '#EF4444' : 'none'}
                  color={isFavorite ? '#EF4444' : 'currentColor'}
                />
              </span>

              {isFavorite
                ? 'Saved in Favorites'
                : 'Not in Favorites yet'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
