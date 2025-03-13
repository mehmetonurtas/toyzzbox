import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from './storage'; // Tarayıcıya uyumlu storage (özel dosya)
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';

// Root reducer'ın birleşimi
const rootReducer = combineReducers({
  cart: cartReducer, // Sepet reducer'ını ekliyoruz
});

// Persist yapılandırması
const persistConfig = {
  key: 'root',
  storage, // SSR uyumlu storage
};

// Persist edilmiş reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store yapılandırması
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor yapılandırması
export const persistor = persistStore(store);

// RootState ve AppDispatch türlerini tanımlıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
