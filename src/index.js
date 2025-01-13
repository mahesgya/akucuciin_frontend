import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routess from "./routes";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter, useRoutes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppRoutes() {
  const element = useRoutes(Routess);
  return element;
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <AppRoutes />
    </Provider>
  </BrowserRouter>
);
