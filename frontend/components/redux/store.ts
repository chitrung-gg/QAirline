import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  bookingSearchReducer,
  bookingCreateReducer,
} from "./feature/booking/bookingSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bookingSearch", "bookingCreate"], // Persist both booking slices
};

const persistedSearchReducer = persistReducer(
  persistConfig,
  bookingSearchReducer
);
const persistedCreateReducer = persistReducer(
  persistConfig,
  bookingCreateReducer
);

export const store = configureStore({
  reducer: {
    bookingSearch: persistedSearchReducer,
    bookingCreate: persistedCreateReducer,
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
