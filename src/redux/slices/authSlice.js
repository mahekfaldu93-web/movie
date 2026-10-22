
import { createSlice } from "@reduxjs/toolkit";

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("movieUser") || "null");
  } catch {
    return null;
  }
};

const initialState = {
  user: getSavedUser(),
  isAuthenticated: !!getSavedUser(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem(
        "movieUser",
        JSON.stringify(action.payload)
      );
    },

    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem(
        "movieUser",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("movieUser");
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  register,
  login,
  logout,
  clearAuthError,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
