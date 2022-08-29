import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  IVerifyRegistrationCodeFormData,
  VerifyRegistrationCodeForm,
} from './VerifyRegistrationCodeForm';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { showSuccessToastAction } from '@src/Toast/toastStore';
import { useAppSelector, useAppDispatch } from '@src/store';

const initialValues: IVerifyRegistrationCodeFormData = {
  code: '',
};

export const VerifyRegistrationCodeScreen = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const isVerificationEmailSent = useAppSelector(
    state => state.auth.verfifiacationEmailSent,
  );
  const navigation =
    useNavigation<
      NavigationProp<TRootNavigatorParams, 'VerifyRegistrationCode'>
    >();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (isVerificationEmailSent === false) {
        return;
      }
      e.preventDefault();
      dispatch(
        showSuccessToastAction({
          message: t('verifyRegistrationCode.checkEmail'),
        }),
      );
    });
  }, [navigation, isVerificationEmailSent, dispatch, t]);

  const registerCodeSignUpHandler = useCallback(
    (values: IVerifyRegistrationCodeFormData) => {
      //  NEEDS T BE FINISHED
    },
    [],
  );

  return (
    <View>
      <VerifyRegistrationCodeForm
        initialValues={initialValues}
        onSubmit={registerCodeSignUpHandler}
        loading={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
