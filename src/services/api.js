
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const getData = async (endpoint, params = {}) => {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key missing. Add VITE_TMDB_API_KEY to your .env file."
    );
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }

  return response.json();
};

export default getData;
