import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // analytics: analyticsReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
