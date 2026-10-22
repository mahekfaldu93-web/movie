import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { Compass, Flame, PlusCircle, Sparkles, Film } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/slices/moviesSlice';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Movies = ({ isTrending: propIsTrending }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isTrending = propIsTrending || location.pathname.includes('/trending');
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const [activeTab, setActiveTab] = useState(isTrending ? 'trending' : 'popular');

  const { popular, trending, customMovies } = useAppSelector((state) => state.movies);

  useEffect(() => {
    setActiveTab(isTrending ? 'trending' : 'popular');
  }, [isTrending]);

  useEffect(() => {
    if (activeTab === 'trending') {
      dispatch(fetchTrendingMovies({ timeWindow: 'week', page: currentPage }));
    } else if (activeTab === 'popular') {
      dispatch(fetchPopularMovies(currentPage));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, activeTab, currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ page: '1' });
  };

  const currentData = activeTab === 'trending' ? trending : popular;
  const customCount = customMovies?.length || 0;

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 pb-3 border-bottom border-subtle">
        <div>
          <h1 className="h3 fw-bold text-main d-flex align-items-center gap-2 mb-2">
            {activeTab === 'trending' ? (
              <Flame className="text-flame" size={26} />
            ) : activeTab === 'custom' ? (
              <Sparkles className="text-accent" size={26} />
            ) : (
              <Compass className="text-accent" size={26} />
            )}
            {activeTab === 'trending'
              ? 'Trending Movies'
              : activeTab === 'custom'
              ? 'My Added Movies'
              : 'Popular Movies'}
          </h1>
          <p className="text-secondary mb-0 small">
            {activeTab === 'trending'
              ? 'The hottest movies being watched and discussed globally right now'
              : activeTab === 'custom'
              ? 'Movies you have contributed to CineVault with custom details and artwork'
              : 'Discover the most popular movies rated and watched by the community'}
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/add-movie" className="btn btn-add-movie d-inline-flex align-items-center gap-2">
            <PlusCircle size={17} /> Add Movie
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="d-flex align-items-center gap-2 mb-4 filter-pills-row">
        <button
          type="button"
          className={`filter-pill ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => handleTabChange('popular')}
        >
          <Compass size={15} /> All Popular
        </button>
        <button
          type="button"
          className={`filter-pill ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => handleTabChange('trending')}
        >
          <Flame size={15} className="text-flame" /> Trending This Week
        </button>
        <button
          type="button"
          className={`filter-pill ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => handleTabChange('custom')}
        >
          <Sparkles size={15} className="text-accent" /> My Added Movies
          {customCount > 0 && <span className="badge-pill-count ms-1">{customCount}</span>}
        </button>
      </div>

      {/* Content for My Added Movies */}
      {activeTab === 'custom' ? (
        customCount === 0 ? (
          <div className="card-glass p-5 text-center my-4">
            <div className="d-inline-flex p-3 rounded-circle bg-accent-soft text-accent mb-3">
              <Film size={40} />
            </div>
            <h4 className="fw-bold text-main mb-2">No custom movies added yet!</h4>
            <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '460px' }}>
              You haven't created any custom movies yet. Click the button below to add your favorite film, indie production, or dream story!
            </p>
            <Link to="/add-movie" className="btn btn-nav-primary d-inline-flex align-items-center gap-2 px-4 py-2">
              <PlusCircle size={18} /> Add Your First Movie
            </Link>
          </div>
        ) : (
          <MovieGrid
            movies={customMovies}
            emptyMessage="No custom movies found."
          />
        )
      ) : (
        <>
          {currentData.error && (
            <ErrorMessage
              message={currentData.error}
              onRetry={() => {
                if (activeTab === 'trending') {
                  dispatch(fetchTrendingMovies({ timeWindow: 'week', page: currentPage }));
                } else {
                  dispatch(fetchPopularMovies(currentPage));
                }
              }}
            />
          )}

          {currentData.loading ? (
            <LoadingSpinner asSkeleton count={18} />
          ) : (
            <>
              <MovieGrid
                movies={currentData.items}
                emptyMessage={`No ${activeTab === 'trending' ? 'trending' : 'popular'} movies found.`}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={currentData.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
