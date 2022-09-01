import React, { useCallback } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Formik, FormikProps } from 'formik';
import i18n from 'i18next';
import * as Yup from 'yup';

import {
  Button,
  Checkbox,
  TextInput,
  Text,
  colors,
  spacing,
} from '@src/components';

export interface IRegisterFormData {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userRole: string;
  language: string;
}

export interface IRegisterFormProps {
  initialValues: IRegisterFormData;
  onSubmit: (values: IRegisterFormData) => void;
  isPending: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email'))
    .required(i18n.t('validation.required')),
  password: Yup.string()
    .min(6, i18n.t('validation.passwordLength'))
    .required(i18n.t('validation.required')),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    i18n.t('validation.acceptRequired'),
  ),
});

export const RegisterForm = ({
  initialValues,
  onSubmit,
  isPending,
}: IRegisterFormProps) => {
  const navigateToTermsOfUse = useCallback(() => {
    // navigate to terms of use
  }, []);

  const renderForm = useCallback(
    (props: FormikProps<IRegisterFormData>) => {
      const {
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        setFieldValue,
        touched,
        isValid,
      } = props;

      return (
        <>
          <TextInput
            withBorder
            label={i18n.t('common.email')}
            errorMessage={errors.email && touched.email ? errors.email : ''}
            size="small"
            secureTextEntry={false}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            blurOnSubmit
            autoCompleteType="off"
          />
          <TextInput
            withBorder
            label={i18n.t('common.password')}
            errorMessage={
              errors.password && touched.password ? errors.password : ''
            }
            size="small"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            textContentType="password"
            blurOnSubmit
            autoCompleteType="off"
          />
          <Checkbox
            checked={values.termsAccepted}
            onPress={() =>
              setFieldValue('termsAccepted', !values.termsAccepted)
            }
            label={
              <Text typography="body">
                <>
                  {i18n.t('register.accept')}
                  <Text typography="body" onPress={navigateToTermsOfUse}>
                    <Text
                      typography="body"
                      style={
                        errors.termsAccepted && touched.termsAccepted
                          ? styles.error
                          : styles.link
                      }>
                      <> {i18n.t('register.termsOfUse')}</>
                    </Text>
                  </Text>
                </>
              </Text>
            }
            errorMessage={
              errors.termsAccepted &&
              touched.termsAccepted &&
              errors.termsAccepted
            }
          />
          <Button
            disabled={
              !isValid ||
              isPending ||
              (Object.keys(touched).length === 0 &&
                touched.constructor === Object)
            }
            onPress={handleSubmit}
            title={i18n.t('register.register')}
            buttonStyle={styles.button}
            isLoading={isPending}
          />
        </>
      );
    },
    [navigateToTermsOfUse, isPending],
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
  link: TextStyle;
  error: TextStyle;
}

const stylesDef: IStyles = {
  button: {
    marginTop: spacing.small,
    marginBottom: spacing.xLarge,
  },
  link: {
    color: colors.primary,
  },
  error: {
    color: colors.error,
  },
};

const styles = StyleSheet.create(stylesDef);
