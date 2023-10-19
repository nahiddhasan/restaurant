import { configureStore } from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';
//   import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartReducer from "./cartRedux";
const createNoopStorage = () => {
    return {
      getItem(_key) {
        return Promise.resolve(null);
      },
      setItem(_key, value) {
        return Promise.resolve(value);
      },
      removeItem(_key) {
        return Promise.resolve();
      },
    };
  };
  
  const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        Cart:persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   
});

export const persistor = persistStore(store)


