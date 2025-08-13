import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem("theme");
  return saved || "system";
};

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  profileData: null,
  isLoading: false,
  theme: getInitialTheme(),
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

    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setLogin, setLogout, setProfileData, setIsLoggedIn, setLoading, setTheme } = authSlice.actions;

export default authSlice.reducer;
