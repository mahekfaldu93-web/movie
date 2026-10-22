
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Film,
  Heart,
  Bookmark,
  Search,
  LogOut,
  Menu,
  X,
  Flame,
  PlusCircle,
} from "lucide-react";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication
  const currentUser = useAppSelector(
    (state) => state.auth?.currentUser ?? state.auth?.user ?? null
  );

  const isAuthenticated = useAppSelector(
    (state) =>
      state.auth?.isAuthenticated ?? Boolean(state.auth?.currentUser ?? state.auth?.user)
  );

  // Favorites count: supports items or ids state structure
  const favoriteCount = useAppSelector((state) => {
    const favorites = state.favorites;

    if (Array.isArray(favorites?.items)) {
      return favorites.items.length;
    }

    if (Array.isArray(favorites?.ids)) {
      return favorites.ids.length;
    }

    return 0;
  });

  // Watchlist count: supports items or ids state structure
  const watchlistCount = useAppSelector((state) => {
    const watchlist = state.watchlist;

    if (Array.isArray(watchlist?.items)) {
      return watchlist.items.length;
    }

    if (Array.isArray(watchlist?.ids)) {
      return watchlist.ids.length;
    }

    return 0;
  });

  // Custom movies count
  const customMovieCount = useAppSelector(
    (state) => state.movies?.customMovies?.length ?? 0
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top custom-navbar ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        {/* Brand */}
        <Link to="/" className="brand-logo me-3">
          <span className="brand-icon">
            <Film size={26} strokeWidth={2.4} />
          </span>

          <span className="brand-text">
            Cine<span className="brand-highlight">Vault</span>
          </span>
        </Link>

        {/* Mobile controls */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <Link
            to="/add-movie"
            className="btn btn-sm btn-add-movie p-1 px-2 d-inline-flex align-items-center gap-1"
            title="Add Movie"
          >
            <PlusCircle size={16} />
            <span className="small">Add</span>
          </Link>

          <button
            className="navbar-toggler border-0 text-white p-1"
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Navigation links */}
        <div
          className={`collapse navbar-collapse ${
            isMenuOpen ? "show" : ""
          }`}
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/trending"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                <Flame size={16} className="text-flame" />
                Trending
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                <Search size={16} />
                Search
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                <Heart size={16} />
                Favorites

                {favoriteCount > 0 && (
                  <span className="badge-count ms-1">
                    {favoriteCount}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                <Bookmark size={16} />
                Watchlist

                {watchlistCount > 0 && (
                  <span className="badge-count ms-1">
                    {watchlistCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Right-side actions */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0 flex-wrap">
            <NavLink
              to="/add-movie"
              className={({ isActive }) =>
                `btn btn-sm btn-add-movie d-inline-flex align-items-center gap-1 ${
                  isActive ? "active-add" : ""
                }`
              }
            >
              <PlusCircle size={16} />
              <span>Add Movie</span>

              {customMovieCount > 0 && (
                <span className="badge-add-count ms-1">
                  {customMovieCount}
                </span>
              )}
            </NavLink>

            {/* Authenticated user */}
            {isAuthenticated ? (
              <div
                className="dropdown position-relative"
                ref={userDropdownRef}
              >
                <button
                  className="btn btn-nav-outline d-flex align-items-center gap-2 dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  onClick={() =>
                    setIsUserDropdownOpen((previous) => !previous)
                  }
                  aria-expanded={isUserDropdownOpen}
                >
                  <div
                    className="avatar-circle"
                    style={{
                      width: "28px",
                      height: "28px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <span className="d-none d-md-inline small fw-semibold text-main">
                    {currentUser?.name || "Account"}
                  </span>
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-glass dropdown-menu-end shadow ${
                    isUserDropdownOpen ? "show" : ""
                  }`}
                  style={{ minWidth: "210px" }}
                >
                  <li className="px-3 py-2 border-bottom border-subtle">
                    <div className="fw-semibold text-main small">
                      {currentUser?.name || "User"}
                    </div>

                    <div className="text-muted small text-truncate">
                      {currentUser?.email || ""}
                    </div>
                  </li>

                  <li>
                    <Link
                      to="/add-movie"
                      className="dropdown-item-custom py-2 d-flex align-items-center gap-2 small"
                    >
                      <PlusCircle size={15} className="text-accent" />
                      Add New Movie
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/favorites"
                      className="dropdown-item-custom py-2 d-flex align-items-center gap-2 small"
                    >
                      <Heart size={15} />
                      My Favorites ({favoriteCount})
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/watchlist"
                      className="dropdown-item-custom py-2 d-flex align-items-center gap-2 small"
                    >
                      <Bookmark size={15} />
                      My Watchlist ({watchlistCount})
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider border-subtle my-1" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item-custom py-2 text-danger d-flex align-items-center gap-2 small w-100"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-sm btn-nav-outline text-center"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="btn btn-sm btn-nav-primary text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
