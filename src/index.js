import ReactDOM from "react-dom/client";
import ScrollToTop from "./hooks/scroll.top";
import "./index.css";
import Routess from "./routes/routes";

import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

import axios from "axios";
import Cookies from "js-cookie";
import { setLogin, setLogout } from "./redux/auth.slicer";

registerServiceWorker();

const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
let refreshPromise = null; 

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const oldRefreshToken = Cookies.get("refreshToken");
      if (!oldRefreshToken) throw new Error("No refresh token");

      const res = await axios.put(`${BASE_URL}/api/auth`, { refresh_token: oldRefreshToken });

      const { accessToken, refreshToken } = res.data.data;
      Cookies.set("accessToken", accessToken, { secure: true, sameSite: "none", expires: 1 });
      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "none", expires: 7 });

      await store.dispatch(setLogin({ accessToken, refreshToken }));
      return accessToken;
    })()
    .finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config || {};

    if (error.response?.status !== 401) return Promise.reject(error);
    
    // Skip interceptor for login and auth endpoints
    const isAuthCall = original.url?.includes("/api/customer/login") || 
                       original.url?.includes("/api/customer") ||
                       original.url?.includes("/api/auth");

    if (isAuthCall) {
      return Promise.reject(error);
    }

    if (original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      const newAccess = await refreshToken();

      original.headers = {
        ...original.headers,
        Authorization: `Bearer ${newAccess}`,
      };

      return axios.request(original);
    } catch (e) {
      await store.dispatch(setLogout());
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return Promise.reject(e);
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppRoutes() {
  const element = useRoutes(Routess);
  return element;
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollToTop />
        <AppRoutes />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
