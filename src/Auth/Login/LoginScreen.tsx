import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Button, FullScreenTemplate } from '@src/components';
import { LoginForm, ILoginFormData } from './LoginForm';
import { useAppDispatch } from '@src/store';
import { loginThunk } from '../authStore';

const initialValues: ILoginFormData = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const loginHandler = useCallback(
    (values: ILoginFormData) => {
      dispatch(loginThunk(values));
    },
    [dispatch],
  );

  const navigateToResetPassword = useCallback(() => {
    // NEEDS TO BE FINSIHED
    // navigation.navigate(Types.Route.ResetPassword);
  }, []);

  return (
    <FullScreenTemplate safeArea padded>
      <LoginForm initialValues={initialValues} onSubmit={loginHandler} />
      <View style={styles.row}>
        <Button
          variant="PRIMARY"
          title={t('login.forgotPassword')}
          onPress={navigateToResetPassword}
        />
      </View>
    </FullScreenTemplate>
  );
};

interface IStyles {
  row: ViewStyle;
}

const stylesDef: IStyles = {
  row: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

const styles = StyleSheet.create(stylesDef);
