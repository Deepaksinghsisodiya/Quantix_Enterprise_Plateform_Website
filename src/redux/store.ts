import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './services/baseApi';
import authReducer from './slices/authSlice';
import themeReducer, { themePersistMiddleware } from './slices/themeSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    ui: uiReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(themePersistMiddleware)
      .concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
