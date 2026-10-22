
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, PlusCircle } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const favorites = useAppSelector(
    (state) => state.favorites
  );

  const items = Array.isArray(favorites?.items)
    ? favorites.items
    : [];

  const ids = Array.isArray(favorites?.ids)
    ? favorites.ids
    : [];

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4 pb-3 border-bottom border-subtle gap-3">
        <div>
          <h1 className="h3 fw-bold text-main d-flex align-items-center gap-2 mb-1">
            <Heart
              className="text-danger"
              size={26}
              fill="#EF4444"
            />
            My Favorite Movies
          </h1>

          <p className="text-secondary small mb-0">
            {items.length} {items.length === 1 ? 'movie' : 'movies'} saved to your personal collection
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/add-movie"
            className="btn btn-sm btn-add-movie d-inline-flex align-items-center gap-1"
          >
            <PlusCircle size={15} />
            Add Movie
          </Link>

          <Link
            to="/movies"
            className="btn btn-sm btn-nav-outline d-inline-flex align-items-center gap-2"
          >
            <Compass size={15} />
            Discover More
          </Link>
        </div>
      </div>

      <MovieGrid
        movies={items}
        emptyMessage="You haven't saved any movies to your favorites list yet. Explore movies or add your own, and tap the heart icon on any poster to bookmark them here!"
        emptyAction={
          <div className="d-flex gap-2 justify-content-center">
            <Link
              to="/movies"
              className="btn btn-nav-primary d-inline-flex align-items-center gap-2"
            >
              <Compass size={18} />
              Browse Movies
            </Link>

            <Link
              to="/add-movie"
              className="btn btn-add-movie d-inline-flex align-items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Movie
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Favorites;
