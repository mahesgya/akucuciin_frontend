import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  profileData: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.profileData = null;
    },

    setProfileData: (state, action) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLogin, setLogout, setProfileData, setIsLoggedIn, setLoading } = authSlice.actions;

export default authSlice.reducer;
