import { useEffect } from 'react';

import { useAppDispatch } from '@src/store';
import { authorizeFromSavedTokenThunk } from './authStore';

export const AuthHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorizeFromSavedTokenThunk());
  }, [dispatch]);

  return null;
};
