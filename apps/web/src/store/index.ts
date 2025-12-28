import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';

function createStore() {
  return configureStore({
    reducer: {
      token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      }),
  });
}

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export { createStore };
