import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookingReducer from "./feature/booking/bookingSlice";    

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["booking"], // Only persist booking slice
};

const persistedReducer = persistReducer(persistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    booking: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
