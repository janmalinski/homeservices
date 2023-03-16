import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import assessment from '@src/Assessment/assessmentStore';
import toast from '@src/Toast/toastStore';
import auth from '@src/Auth/authStore';
import user from '@src/User/userStore';
import ad from '@src/Ad/adStore';

const makeStore = () => {
  return configureStore({
    reducer: {
      assessment,
      toast,
      auth,
      user,
      ad,
    },
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat([someMiddleware])
    // },
    devTools: __DEV__,
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
