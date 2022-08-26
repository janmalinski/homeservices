import React, { useState, useCallback } from 'react';
import {
  TextInput as TextInputRN,
  TextInputProps,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
  Text,
} from 'react-native';

import { colors, spacing, textStyles, Icon } from '@src/components';

export interface ITextInputProps extends TextInputProps {
  withBorder: boolean;
  size: 'small' | 'medium' | 'textArea';
  label?: string;
  disabled?: boolean;
  errorMessage: string;
  autoCompleteType?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SMALL_INPUT_HEIGHT = 48;
export const MEDIUM_INPUT_HEIGHT = 60;

export const TextInput: React.FC<ITextInputProps> = ({
  withBorder,
  label,
  disabled,
  errorMessage,
  iconLeft,
  iconRight,
  size,
  placeholder,
  secureTextEntry,
  numberOfLines,
  value,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(
    !secureTextEntry,
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setActive(prevState => !prevState);
      onBlur && onBlur(event);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setActive(prevState => !prevState);
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const secureTextHandler = useCallback(() => {
    setIsSecureTextVisible(prevState => !prevState);
  }, []);

  const SecureTextIcon = (
    <Icon
      name={isSecureTextVisible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      onPress={secureTextHandler}
      color={
        disabled ? colors.disabled : value ? colors.primary : colors.secondary
      }
      style={styles.iconContainer}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={[styles.label, errorMessage.length > 0 && styles.labelError]}>
        {label}
      </Text>
      <TextInputRN
        {...props}
        style={
          disabled
            ? styles.disabledText
            : [
                size === 'textArea' &&
                  Platform.OS === 'android' &&
                  styles.textArea,
                styles.text,
                styles.inputContainer,
                size === 'small'
                  ? styles.smallInput
                  : size === 'medium'
                  ? styles.mediumInput
                  : null,
                withBorder ? styles.withBorder : styles.lineInput,
                !!value && styles.filledBorder,
                disabled && styles.disabledContainer,
                !!errorMessage && styles.errorBorder,
                active && styles.activeBorder,
              ]
        }
        value={value}
        editable={disabled}
        placeholder={placeholder}
        placeholderTextColor={colors.disabled}
        secureTextEntry={secureTextEntry && !isSecureTextVisible}
        multiline={size === 'textArea'}
        numberOfLines={numberOfLines}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {secureTextEntry && SecureTextIcon}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: spacing.tiny,
  },
  inputContainer: {
    backgroundColor: colors.white,
  },
  smallInput: {
    height: SMALL_INPUT_HEIGHT,
  },
  mediumInput: {
    height: MEDIUM_INPUT_HEIGHT,
  },
  lineInput: {
    borderBottomWidth: 2,
  },
  withBorder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.primary,
  },
  activeBorder: {
    borderColor: colors.black,
  },
  filledBorder: {
    borderColor: colors.disabled,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  disabledContainer: {
    borderColor: colors.disabled,
    backgroundColor: colors.disabledLight,
  },
  disabledText: {
    ...textStyles.typographies.body,
    color: colors.disabled,
  },
  text: {
    ...textStyles.typographies.body,
    color: colors.gray,
    paddingHorizontal: spacing.small,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  errorMessage: {
    ...textStyles.typographies.caption2,
    color: colors.error,
    marginTop: spacing.tiny,
  },
  label: {
    ...textStyles.typographies.subhead,
    ...textStyles.fontWeights.semiBold,
    color: colors.black,
    marginBottom: 4,
  },
  labelError: {
    color: colors.error,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    right: spacing.small,
    marginTop: -34,
  },
});
