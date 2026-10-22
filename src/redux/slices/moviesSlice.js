import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieService, {
  getCustomMovies,
  saveCustomMovieToStorage,
  deleteCustomMovieFromStorage,
} from "../../services/movieService";
import { FALLBACK_MOVIES, FALLBACK_GENRES } from "../../services/tmdbFallbackData";

// ======================================
// FETCH POPULAR MOVIES
// ======================================

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await movieService.getPopularMovies(page);
      return data;
    } catch (error) {
      // Keep the homepage useful when a TMDB key is not configured or the API is unavailable.
      return {
        page,
        results: FALLBACK_MOVIES,
        total_pages: 1,
        total_results: FALLBACK_MOVIES.length,
        usingFallback: true,
      };
    }
  }
);

// ======================================
// FETCH TRENDING MOVIES
// ======================================

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrending",
  async (
    { timeWindow = "week", page = 1 } = {},
    { rejectWithValue }
  ) => {
    try {
      const data = await movieService.getTrendingMovies(
        timeWindow,
        page
      );
      return data;
    } catch (error) {
      return {
        page,
        results: FALLBACK_MOVIES,
        total_pages: 1,
        total_results: FALLBACK_MOVIES.length,
        usingFallback: true,
      };
    }
  }
);

// ======================================
// FETCH MOVIE DETAILS
// ======================================

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (movieId, { rejectWithValue }) => {
    try {
      const customMovie = getCustomMovies().find(
        (movie) => String(movie.id) === String(movieId)
      );

      if (customMovie) {
        return customMovie;
      }

      const data = await movieService.getMovieDetails(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch movie details"
      );
    }
  }
);

// ======================================
// FETCH MOVIE CREDITS
// ======================================

export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchCredits",
  async (movieId, { rejectWithValue }) => {
    try {
      const customMovie = getCustomMovies().find(
        (movie) => String(movie.id) === String(movieId)
      );

      if (customMovie) {
        return {
          id: movieId,
          cast: [],
          crew: [],
        };
      }

      const data = await movieService.getMovieCredits(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch movie credits"
      );
    }
  }
);

// ======================================
// SEARCH MOVIES
// ======================================

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      if (!query || !query.trim()) {
        return {
          results: [],
          page: 1,
          total_pages: 1,
          total_results: 0,
          query: "",
        };
      }

      const data = await movieService.searchMovies(
        query.trim(),
        page
      );

      return {
        ...data,
        query: query.trim(),
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Search failed"
      );
    }
  }
);

// ======================================
// FETCH GENRES
// ======================================

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { movies } = getState();

      if (movies.genres.items.length > 0) {
        return movies.genres.items;
      }

      const data = await movieService.getGenres();
      return data;
    } catch (error) {
      return FALLBACK_GENRES;
    }
  }
);

// ======================================
// FETCH MOVIES BY GENRE
// ======================================

export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchByGenre",
  async ({ genreId, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await movieService.getMoviesByGenre(
        genreId,
        page
      );

      return {
        ...data,
        genreId,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch genre movies"
      );
    }
  }
);

// ======================================
// INITIAL STATE
// ======================================

const createMovieCollection = () => ({
  items: [],
  page: 1,
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
});

const initialState = {
  customMovies: getCustomMovies(),

  popular: createMovieCollection(),

  trending: createMovieCollection(),

  selectedMovie: {
    data: null,
    credits: null,
    loading: false,
    error: null,
  },

  search: {
    query: "",
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    loading: false,
    error: null,
  },

  genres: {
    items: [],
    loading: false,
    error: null,
  },

  byGenre: {
    genreId: null,
    ...createMovieCollection(),
  },
};

// ======================================
// MOVIES SLICE
// ======================================

const moviesSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    // ADD CUSTOM MOVIE
    addCustomMovie: (state, action) => {
      const movie = action.payload;

      saveCustomMovieToStorage(movie);

      state.customMovies = [
        movie,
        ...state.customMovies.filter(
          (item) => String(item.id) !== String(movie.id)
        ),
      ];

      state.popular.items = [
        movie,
        ...state.popular.items.filter(
          (item) => String(item.id) !== String(movie.id)
        ),
      ];

      state.trending.items = [
        movie,
        ...state.trending.items.filter(
          (item) => String(item.id) !== String(movie.id)
        ),
      ];
    },

    // DELETE CUSTOM MOVIE
    deleteCustomMovie: (state, action) => {
      const movieId = action.payload;

      deleteCustomMovieFromStorage(movieId);

      const removeMovie = (movie) =>
        String(movie.id) !== String(movieId);

      state.customMovies =
        state.customMovies.filter(removeMovie);

      state.popular.items =
        state.popular.items.filter(removeMovie);

      state.trending.items =
        state.trending.items.filter(removeMovie);

      state.search.results =
        state.search.results.filter(removeMovie);

      state.byGenre.items =
        state.byGenre.items.filter(removeMovie);

      if (
        String(state.selectedMovie.data?.id) ===
        String(movieId)
      ) {
        state.selectedMovie.data = null;
        state.selectedMovie.credits = null;
      }
    },

    // SYNC CUSTOM MOVIES
    syncCustomMovies: (state) => {
      state.customMovies = getCustomMovies();
    },

    // CLEAR SEARCH RESULTS
    clearSearchResults: (state) => {
      state.search.query = "";
      state.search.results = [];
      state.search.page = 1;
      state.search.totalPages = 1;
      state.search.totalResults = 0;
      state.search.loading = false;
      state.search.error = null;
    },

    // SET SEARCH QUERY
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },

    // CLEAR SELECTED MOVIE
    clearSelectedMovie: (state) => {
      state.selectedMovie.data = null;
      state.selectedMovie.credits = null;
      state.selectedMovie.loading = false;
      state.selectedMovie.error = null;
    },
  },

  // ======================================
  // ASYNC REDUCERS
  // ======================================

  extraReducers: (builder) => {
    // POPULAR MOVIES
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.items = action.payload.results || [];
        state.popular.page = action.payload.page || 1;
        state.popular.totalPages = Math.min(
          action.payload.total_pages || 1,
          500
        );
        state.popular.totalResults =
          action.payload.total_results || 0;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error =
          action.payload || "Failed to load popular movies";
      });

    // TRENDING MOVIES
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending.loading = false;
        state.trending.items = action.payload.results || [];
        state.trending.page = action.payload.page || 1;
        state.trending.totalPages = Math.min(
          action.payload.total_pages || 1,
          500
        );
        state.trending.totalResults =
          action.payload.total_results || 0;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error =
          action.payload || "Failed to load trending movies";
      });

    // MOVIE DETAILS
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.selectedMovie.loading = true;
        state.selectedMovie.error = null;
        state.selectedMovie.data = null;
        state.selectedMovie.credits = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie.loading = false;
        state.selectedMovie.data = action.payload;
        state.selectedMovie.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.selectedMovie.loading = false;
        state.selectedMovie.error =
          action.payload || "Failed to load movie details";
      });

    // MOVIE CREDITS
    builder.addCase(
      fetchMovieCredits.fulfilled,
      (state, action) => {
        state.selectedMovie.credits = action.payload;
      }
    );

    // SEARCH MOVIES
    builder
      .addCase(searchMovies.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.results = action.payload.results || [];
        state.search.query = action.payload.query || "";
        state.search.page = action.payload.page || 1;
        state.search.totalPages = Math.min(
          action.payload.total_pages || 1,
          500
        );
        state.search.totalResults =
          action.payload.total_results || 0;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error =
          action.payload || "Search failed";
      });

    // GENRES
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.genres.loading = true;
        state.genres.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres.loading = false;
        state.genres.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.genres || [];
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres.loading = false;
        state.genres.error =
          action.payload || "Failed to load genres";
      });

    // MOVIES BY GENRE
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.byGenre.loading = true;
        state.byGenre.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.byGenre.loading = false;
        state.byGenre.genreId = action.payload.genreId;
        state.byGenre.items = action.payload.results || [];
        state.byGenre.page = action.payload.page || 1;
        state.byGenre.totalPages = Math.min(
          action.payload.total_pages || 1,
          500
        );
        state.byGenre.totalResults =
          action.payload.total_results || 0;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.byGenre.loading = false;
        state.byGenre.error =
          action.payload || "Failed to load genre movies";
      });
  },
});

// ======================================
// EXPORT ACTIONS
// ======================================

export const {
  addCustomMovie,
  deleteCustomMovie,
  syncCustomMovies,
  clearSearchResults,
  clearSelectedMovie,
  setSearchQuery,
} = moviesSlice.actions;

// ======================================
// EXPORT REDUCER
// ======================================

export default moviesSlice.reducer;
