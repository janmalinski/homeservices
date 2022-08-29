import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18next';

import { Button, TextInput } from '@src/components';

export interface IVerifyRegistrationCodeFormData {
  code: string;
}

export interface Props {
  initialValues: IVerifyRegistrationCodeFormData;
  loading?: boolean;
  onSubmit: (values: IVerifyRegistrationCodeFormData) => void;
}

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(4, i18n.t('validation:registrationCodeLength'))
    .required(i18n.t('validation:required')),
});

export const VerifyRegistrationCodeForm = ({
  initialValues,
  loading,
  onSubmit,
}: Props) => {
  const renderForm = useCallback(
    (props: FormikProps<IVerifyRegistrationCodeFormData>) => {
      const {
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
      } = props;

      return (
        <View>
          <TextInput
            withBorder
            label={i18n.t('registrationCodeSignUp:registrationCode')}
            errorMessage={errors.code && touched.code ? errors.code : ''}
            size="small"
            secureTextEntry={false}
            value={values.code}
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            autoCapitalize="none"
            blurOnSubmit
            keyboardType="number-pad"
            autoCompleteType="off"
          />
          <Button
            onPress={handleSubmit}
            title={i18n.t('registrationCodeSignUp:registrationCodeButton')}
            buttonStyle={styles.button}
            isLoading={loading}
          />
        </View>
      );
    },
    [loading],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {renderForm}
    </Formik>
  );
};

interface IStyles {
  button: ViewStyle;
}

const stylesDef: IStyles = {
  button: {
    marginTop: 8,
    marginBottom: 20,
  },
};

const styles = StyleSheet.create(stylesDef);
