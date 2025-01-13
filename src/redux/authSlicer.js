import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  profile: {
    name: "",
    telephone: "",
    address: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.profile = action.payload.profile;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.profile = initialState.profile;
    },
    updateProfile: (state, action) => {
        state.profile = {...state.profile, ...action.payload};
    },
  },
});

export const { setLogin, setLogout, updateProfile } = authSlice.actions;

export default authSlice.reducer;