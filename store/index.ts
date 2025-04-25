import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from './apiSlice';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import productsReducer from './productsSlice';

const storage = new MMKVLoader().initialize();

const persistConfig = {
    key: 'root',
    storage: {
        getItem: (key: string) => {
            return storage.getItem(key);
        },
        setItem: (key: string, value: string) => {
            return storage.setItem(key, value);
        },
        removeItem: (key: string) => {
            storage.removeItem(key);
            return Promise.resolve();
        },
    },
    whitelist: ['auth', 'favorites'],
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 