import React, { useCallback } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FullScreenTemplate, Text } from '@src/components';

import { ResetPasswordForm, IResetPasswordFormData } from './ResetPasswordForm';

const initialValues = {
  email: '',
};

export const ResetPasswordScreen = () => {
  const [t] = useTranslation();

  const resetPassword = useCallback((values: IResetPasswordFormData) => {
    //   NEEDS TO BE FINISHED
  }, []);

  return (
    <FullScreenTemplate safeArea padded>
      <Text typography="body" style={styles.guideText}>
        {t('resetPassword.guide1')}
      </Text>
      <Text typography="body" style={styles.guideText}>
        {t('resetPassword.guide2')}
      </Text>
      <ResetPasswordForm
        initialValues={initialValues}
        onSubmit={resetPassword}
      />
    </FullScreenTemplate>
  );
};

interface IStyles {
  guideText: TextStyle;
}

const stylesDef: IStyles = {
  guideText: {
    marginVertical: 8,
  },
};

const styles = StyleSheet.create(stylesDef);
