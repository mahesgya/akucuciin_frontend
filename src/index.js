import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import AboutUs from './components/aboutUs';
import Routess from './routes';
import ScrollToTop from './ScrollToTop';
import { createBrowserRouter, RouterProvider, Route, BrowserRouter, useRoutes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppRoutes() {
  const element = useRoutes(Routess);
  return element;
}

root.render(
 <BrowserRouter>
 <ScrollToTop/>
 <AppRoutes/>
 </BrowserRouter>
);