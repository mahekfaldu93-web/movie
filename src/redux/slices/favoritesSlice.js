
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;

      const exists = state.items.some(
        (item) => String(item.id) === String(movie.id)
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => String(item.id) !== String(movie.id)
        );
      } else {
        state.items.push(movie);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectIsFavorite = (state, movieId) =>
  state.favorites.items.some(
    (movie) => String(movie.id) === String(movieId)
  );

export default favoritesSlice.reducer;
