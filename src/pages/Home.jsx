
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Flame,
  Compass,
  ChevronRight,
  Play,
  PlusCircle,
  Sparkles,
} from "lucide-react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesByGenre,
} from "../redux/slices/moviesSlice";

import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getBackdropUrl } from "../utils/constants";

const emptyCollection = {
  items: [],
  loading: false,
  error: null,
};

const Home = () => {
  const dispatch = useAppDispatch();

  const movieState = useAppSelector((state) => state.movies);

  const trending = movieState?.trending ?? emptyCollection;
  const popular = movieState?.popular ?? emptyCollection;
  const genres = movieState?.genres ?? { items: [], loading: false, error: null };
  const byGenre = movieState?.byGenre ?? emptyCollection;
  const customMovies = Array.isArray(movieState?.customMovies)
    ? movieState.customMovies
    : [];

  const [selectedGenreId, setSelectedGenreId] = useState(null);

  // Load homepage data
  useEffect(() => {
    if (!trending.items?.length && !trending.loading) {
      dispatch(fetchTrendingMovies({ timeWindow: "week", page: 1 }));
    }

    if (!popular.items?.length && !popular.loading) {
      dispatch(fetchPopularMovies(1));
    }

    if (!genres.items?.length && !genres.loading) {
      dispatch(fetchGenres());
    }
  }, [
    dispatch,
    trending.items?.length,
    trending.loading,
    popular.items?.length,
    popular.loading,
    genres.items?.length,
    genres.loading,
  ]);

  // Genre selection
  const handleGenreSelect = (genreId) => {
    if (selectedGenreId === genreId) {
      setSelectedGenreId(null);
      return;
    }

    setSelectedGenreId(genreId);
    dispatch(fetchMoviesByGenre({ genreId, page: 1 }));
  };

  // Hero movie
  const heroMovie =
    trending.items?.find((movie) => movie.backdrop_path) ||
    trending.items?.[0] ||
    popular.items?.[0] ||
    null;

  const heroBackdrop = heroMovie?.backdrop_path
    ? getBackdropUrl(heroMovie.backdrop_path, "original")
    : null;

  const heroYear = heroMovie?.release_date
    ? heroMovie.release_date.substring(0, 4)
    : "";

  const heroRating =
    typeof heroMovie?.vote_average === "number"
      ? heroMovie.vote_average.toFixed(1)
      : "N/A";

  const anyError = trending.error || popular.error;

  const selectedGenreName =
    genres.items?.find((genre) => genre.id === selectedGenreId)?.name ||
    "Genre";

  return (
    <div className="home-page">
      {/* Hero section */}
      {heroMovie ? (
        <section
          className="hero-section"
          style={{
            backgroundImage: heroBackdrop
              ? `url("${heroBackdrop}")`
              : "linear-gradient(135deg, #141d33, #090d1a)",
          }}
        >
          <div className="hero-overlay" />
          <div className="hero-bottom-fade" />

          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <Flame size={14} className="text-flame" />
                #1 Trending This Week
              </div>

              <h1 className="hero-title">
                {heroMovie.title || heroMovie.name || "Discover Movies"}
              </h1>

              <div className="hero-meta">
                <span className="meta-rating">
                  <Star
                    size={16}
                    fill="var(--accent-gold)"
                    stroke="var(--accent-gold)"
                  />
                  {heroRating} Rating
                </span>

                {heroYear && (
                  <>
                    <span>•</span>
                    <span>{heroYear}</span>
                  </>
                )}

                <span>•</span>

                <span className="badge badge-glass">Featured</span>
              </div>

              <p className="hero-overview">
                {heroMovie.overview ||
                  "Discover cinema at its finest. Explore movies, learn about casts, and build your personal watchlist."}
              </p>

              <div className="hero-actions">
                <Link
                  to={`/movie/${heroMovie.id}`}
                  className="btn btn-nav-primary d-inline-flex align-items-center gap-2 px-4 py-2"
                >
                  <Play size={18} fill="#FFFFFF" />
                  View Details
                </Link>

                <Link
                  to="/movies"
                  className="btn btn-nav-outline d-inline-flex align-items-center gap-2 px-4 py-2"
                >
                  <Compass size={18} />
                  Explore Movies
                </Link>

                <Link
                  to="/add-movie"
                  className="btn btn-add-movie d-inline-flex align-items-center gap-2 px-4 py-2"
                >
                  <PlusCircle size={18} />
                  Add Movie
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : trending.loading || popular.loading ? (
        <div className="container my-5">
          <div
            className="skeleton"
            style={{ height: "420px", borderRadius: "16px" }}
          />
        </div>
      ) : (
        <section className="container py-5">
          <div className="p-4 rounded-4">
            <h1 className="text-main">Welcome to CineVault</h1>
            <p className="text-secondary">
              Discover trending movies, popular films, and your next favorite.
            </p>
            <Link to="/movies" className="btn btn-nav-primary">
              Explore Movies
            </Link>
          </div>
        </section>
      )}

      <div className="container">
        {/* API error */}
        {anyError && (
          <ErrorMessage
            message={String(anyError)}
            onRetry={() => {
              dispatch(fetchTrendingMovies({ timeWindow: "week", page: 1 }));
              dispatch(fetchPopularMovies(1));
            }}
          />
        )}

        {/* Custom movies */}
        {customMovies.length > 0 && (
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="h4 fw-bold text-main mb-1 d-flex align-items-center gap-2">
                  <Sparkles size={22} className="text-accent" />
                  Added by You
                  <span className="badge badge-custom-movie ms-1">
                    {customMovies.length}
                  </span>
                </h2>

                <p className="text-secondary small mb-0">
                  Your personally curated movies
                </p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/add-movie"
                  className="btn btn-sm btn-nav-outline d-inline-flex align-items-center gap-1"
                >
                  <PlusCircle size={15} />
                  Add Another
                </Link>

                <Link
                  to="/movies"
                  className="text-accent small fw-semibold text-decoration-none d-flex align-items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <MovieGrid movies={customMovies.slice(0, 6)} />
          </section>
        )}

        {/* Browse by genre */}
        {genres.items?.length > 0 && (
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h5 fw-bold text-main mb-0">
                Browse by Genre
              </h2>

              {selectedGenreId !== null && (
                <button
                  type="button"
                  className="btn btn-link btn-sm text-secondary text-decoration-none p-0"
                  onClick={() => setSelectedGenreId(null)}
                >
                  Reset Filter
                </button>
              )}
            </div>

            <div className="filter-pills-row">
              <button
                type="button"
                className={`filter-pill ${
                  selectedGenreId === null ? "active" : ""
                }`}
                onClick={() => setSelectedGenreId(null)}
              >
                All Genres
              </button>

              {genres.items.slice(0, 14).map((genre) => (
                <button
                  type="button"
                  key={genre.id}
                  className={`filter-pill ${
                    selectedGenreId === genre.id ? "active" : ""
                  }`}
                  onClick={() => handleGenreSelect(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Movies by genre */}
        {selectedGenreId !== null && (
          <section className="mb-5">
            <h2 className="h4 fw-bold text-main mb-3">
              {selectedGenreName} Movies
            </h2>

            {byGenre.loading ? (
              <LoadingSpinner asSkeleton count={6} />
            ) : byGenre.error ? (
              <ErrorMessage
                message={String(byGenre.error)}
                onRetry={() =>
                  dispatch(
                    fetchMoviesByGenre({
                      genreId: selectedGenreId,
                      page: 1,
                    })
                  )
                }
              />
            ) : (
              <MovieGrid movies={byGenre.items?.slice(0, 12) || []} />
            )}
          </section>
        )}

        {/* Trending movies */}
        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="h4 fw-bold text-main mb-1 d-flex align-items-center gap-2">
                <Flame size={20} className="text-flame" />
                Trending Movies
              </h2>

              <p className="text-secondary small mb-0">
                The most popular titles this week
              </p>
            </div>

            <Link
              to="/trending"
              className="text-accent small fw-semibold text-decoration-none d-flex align-items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {trending.loading && !trending.items?.length ? (
            <LoadingSpinner asSkeleton count={6} />
          ) : trending.items?.length ? (
            <MovieGrid movies={trending.items.slice(0, 12)} />
          ) : (
            <p className="text-secondary">
              No trending movies available right now.
            </p>
          )}
        </section>

        {/* Popular movies */}
        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="h4 fw-bold text-main mb-1 d-flex align-items-center gap-2">
                <Compass size={20} className="text-accent" />
                Popular Movies
              </h2>

              <p className="text-secondary small mb-0">
                Popular titles selected by movie fans
              </p>
            </div>

            <Link
              to="/movies"
              className="text-accent small fw-semibold text-decoration-none d-flex align-items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {popular.loading && !popular.items?.length ? (
            <LoadingSpinner asSkeleton count={6} />
          ) : popular.items?.length ? (
            <MovieGrid movies={popular.items.slice(0, 12)} />
          ) : (
            <p className="text-secondary">
              No popular movies available right now.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
