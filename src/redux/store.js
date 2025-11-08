import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.slicer";
import locationReducer from "./location.slicer";

const authPersistConfig = {
  key: "auth", 
  storage,
};

const locationPersistConfig = {
  key: "location",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedLocationReducer = persistReducer(locationPersistConfig, locationReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    location: persistedLocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
