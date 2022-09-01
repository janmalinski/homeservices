import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Button, FullScreenTemplate } from '@src/components';
import { LoginForm, ILoginFormData } from './LoginForm';
import { useAppDispatch, useAppSelector } from '@src/store';
import { loginThunk } from '../authStore';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';

const initialValues: ILoginFormData = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const navigation =
    useNavigation<NavigationProp<TRootNavigatorParams, 'Login'>>();

  const dispatch = useAppDispatch();

  const [t] = useTranslation();

  const isPending = useAppSelector(state => state.auth.loginPending);

  const loginHandler = useCallback(
    (values: ILoginFormData) => {
      dispatch(loginThunk(values));
    },
    [dispatch],
  );

  const navigateToResetPassword = useCallback(() => {
    navigation.navigate('ResetPassword');
  }, [navigation]);

  return (
    <FullScreenTemplate safeArea padded>
      <LoginForm
        initialValues={initialValues}
        onSubmit={loginHandler}
        isPending={isPending}
      />
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
