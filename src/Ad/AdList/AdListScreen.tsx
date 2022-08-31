import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, FullScreenTemplate } from '@src/components';
import { useAppDispatch } from '@src/store';
import { logoutThunk } from '@src/Auth/authStore';

export const AdListScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <FullScreenTemplate safeArea padded>
      <Button title="Log out" onPress={handleLogout} />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({});
