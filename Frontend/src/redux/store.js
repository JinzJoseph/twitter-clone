import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserSlice from "./UserSlice";
import tweetSlice from "./tweetSlice";

// Combine reducers
const rootReducer = combineReducers({
  user: UserSlice,
  tweet: tweetSlice
});

const persistConfig = {
  key: "root", // The key should be a string
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
