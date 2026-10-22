
import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWatchlist: (state, action) => {
      const movie = action.payload;

      const exists = state.items.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== movie.id
        );
      } else {
        state.items.push(movie);
      }
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;

export const selectIsInWatchlist = (state, movieId) =>
  state.watchlist.items.some((movie) => movie.id === movieId);

export default watchlistSlice.reducer;
