import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

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
        ...action.payload
      };
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLogin, setLogout, setProfileData, setIsLoggedIn, setLoading } = authSlice.actions;

export default authSlice.reducer;

export const checkAuth = () => async (dispatch, getState) => {
  const { accessToken, refreshToken } = getState().auth;

  if (!accessToken) {
    dispatch(setLogout());
    return;
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/customer`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(setProfileData(response.data));
  } catch (error) {
    try {
      const refreshResponse = await axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth`, {
        refresh_token: refreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;

      Cookies.set("accessToken", newAccessToken, {
        secure: false,
        sameSite: "none",
        expires: 1,
      });
      Cookies.set("refreshToken", newRefreshToken, { secure: false, sameSite: "none", expires: 7 });

      dispatch(setLogin({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

      dispatch(checkAuth());
    } catch (refreshError) {
      dispatch(setLogout());
    }
  }
};
