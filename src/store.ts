import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { Middleware } from 'redux';

import assessment from '@src/Assessment/assessmentStore';
import toast from '@src/Toast/toastStore';

let flipperMiddleware: Middleware;
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  flipperMiddleware = createDebugger();
}

const makeStore = () => {
  return configureStore({
    reducer: {
      assessment,
      toast,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(flipperMiddleware || []),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
