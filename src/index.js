import ReactDOM from "react-dom/client";
import "./index.css";
import Routess from "./routes/routes";
import ScrollToTop from "./hooks/scroll.top";

import { BrowserRouter, useRoutes } from "react-router-dom";
import { store, persistor } from "./redux/store"; 
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { register as registerServiceWorker } from './serviceWorkerRegistration';

registerServiceWorker();

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
