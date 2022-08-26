import React, { useCallback } from 'react';

import { FullScreenTemplate } from '@src/components';
import { RegisterForm, IRegisterFormData } from './RegisterForm';

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
  //  NEEDS TO BE FINISHED
  const isLoading = false;

  const registerHandler = useCallback((values: IRegisterFormData) => {
    //     const {
    //       latitude,
    //       longitude,
    //       userType: { id },
    //     } = route.params;
    //  NEEDS TO BE FINISHED
  }, []);

  return (
    <FullScreenTemplate safeArea padded isLoading={isLoading}>
      <RegisterForm
        initialValues={initialValues}
        onSubmit={registerHandler}
        loading={false}
      />
    </FullScreenTemplate>
  );
};
