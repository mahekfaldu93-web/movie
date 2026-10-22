
import { getData } from "./api";

// Local storage key for custom movies
const CUSTOM_MOVIES_KEY = "customMovies";

// ======================================
// POPULAR MOVIES
// ======================================

const getPopularMovies = (page = 1) => {
  return getData("/movie/popular", { page });
};

// ======================================
// TRENDING MOVIES
// ======================================

const getTrendingMovies = (timeWindow = "week", page = 1) => {
  return getData(`/trending/movie/${timeWindow}`, { page });
};

// ======================================
// SEARCH MOVIES
// ======================================

const searchMovies = (query, page = 1) => {
  if (!query?.trim()) {
    return Promise.resolve({
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    });
  }

  return getData("/search/movie", {
    query: query.trim(),
    page,
    include_adult: false,
  });
};

// ======================================
// MOVIE DETAILS
// ======================================

const getMovieDetails = (movieId) => {
  return getData(`/movie/${movieId}`, {
    append_to_response: "videos,similar,recommendations",
  });
};

// ======================================
// MOVIE CREDITS
// ======================================

const getMovieCredits = (movieId) => {
  return getData(`/movie/${movieId}/credits`);
};

// ======================================
// GENRES
// ======================================

const getGenres = async () => {
  const data = await getData("/genre/movie/list");
  return data.genres || [];
};

// ======================================
// MOVIES BY GENRE
// ======================================

const getMoviesByGenre = (genreId, page = 1) => {
  return getData("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
};

// ======================================
// GET CUSTOM MOVIES FROM LOCAL STORAGE
// ======================================

export const getCustomMovies = () => {
  try {
    const movies = JSON.parse(
      localStorage.getItem(CUSTOM_MOVIES_KEY) || "[]"
    );

    return Array.isArray(movies) ? movies : [];
  } catch (error) {
    console.error("Error reading custom movies:", error);
    return [];
  }
};

// ======================================
// SAVE CUSTOM MOVIE
// ======================================

export const saveCustomMovieToStorage = (movie) => {
  try {
    const movies = getCustomMovies();

    const updatedMovies = [
      movie,
      ...movies.filter(
        (item) => String(item.id) !== String(movie.id)
      ),
    ];

    localStorage.setItem(
      CUSTOM_MOVIES_KEY,
      JSON.stringify(updatedMovies)
    );

    return updatedMovies;
  } catch (error) {
    console.error("Error saving custom movie:", error);
    throw error;
  }
};

// ======================================
// DELETE CUSTOM MOVIE FROM STORAGE
// ======================================

export const deleteCustomMovieFromStorage = (movieId) => {
  try {
    const movies = getCustomMovies();

    const updatedMovies = movies.filter(
      (movie) => String(movie.id) !== String(movieId)
    );

    localStorage.setItem(
      CUSTOM_MOVIES_KEY,
      JSON.stringify(updatedMovies)
    );

    return updatedMovies;
  } catch (error) {
    console.error("Error deleting custom movie:", error);
    throw error;
  }
};

// ======================================
// DEFAULT MOVIE SERVICE
// ======================================

const movieService = {
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getGenres,
  getMoviesByGenre,
};

export default movieService;
