
import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Compass } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import MovieGrid from '../components/MovieGrid';

const Watchlist = () => {
  const watchlist = useAppSelector(
    (state) => state.watchlist
  );

  const items = Array.isArray(watchlist?.items)
    ? watchlist.items
    : [];

  return (
    <div className="container py-4 text-white">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h1 className="h3 fw-bold d-flex align-items-center gap-2">
            <Bookmark size={26} />
            My Watchlist
          </h1>
          <p className="text-secondary mb-0">
            {items.length} {items.length === 1 ? 'movie' : 'movies'} in your watchlist
          </p>
        </div>

        <Link
          to="/movies"
          className="btn btn-outline-light d-inline-flex align-items-center gap-2"
        >
          <Compass size={18} />
          Discover Movies
        </Link>
      </div>

      <MovieGrid
        movies={items}
        emptyMessage="Your watchlist is empty. Browse movies and add the ones you want to watch!"
        emptyAction={
          <Link to="/movies" className="btn btn-primary">
            Browse Movies
          </Link>
        }
      />
    </div>
  );
};

export default Watchlist;
