import React, { useCallback, useEffect } from 'react';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { FullScreenTemplate } from '@src/components';
import { RegisterForm, IRegisterFormData } from './RegisterForm';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '@src/store';
import { registerThunk } from '../authStore';
import { language } from '@src/locale/i18nConfig';

const initialValues: IRegisterFormData = {
  email: '',
  password: '',
  termsAccepted: false,
  latitude: 0,
  longitude: 0,
  userType: '',
  language: '',
};

export const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<TRootNavigatorParams, 'Register'>>();
  const navigation =
    useNavigation<NavigationProp<TRootNavigatorParams, 'Register'>>();
  const isLoading = useAppSelector(state => state.auth.pending);
  const isVerificationEmailSent = useAppSelector(
    state => state.auth.verfifiacationEmailSent,
  );

  useEffect(() => {
    if (!isLoading && isVerificationEmailSent) {
      navigation.navigate('VerifyRegistrationCode');
    }
  }, [isLoading, isVerificationEmailSent, navigation]);

  const registerHandler = useCallback(
    (values: IRegisterFormData) => {
      const {
        latitude,
        longitude,
        userType: { id },
      } = route.params;
      const data = {
        ...values,
        latitude,
        longitude,
        userType: id,
        language,
      };

      dispatch(registerThunk(data));
    },
    [dispatch, route.params],
  );

  return (
    <FullScreenTemplate safeArea padded>
      <RegisterForm
        initialValues={initialValues}
        onSubmit={registerHandler}
        loading={isLoading}
      />
    </FullScreenTemplate>
  );
};
