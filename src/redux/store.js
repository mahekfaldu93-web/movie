
import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./slices/moviesSlice.js";
import authReducer from "./slices/authSlice.js";
import favoritesReducer from "./slices/favoritesSlice.js";
import watchlistReducer from "./slices/watchlistSlice.js";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
