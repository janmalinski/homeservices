import React from 'react';
import { StyleSheet, Text as RNText, TextProps, TextStyle } from 'react-native';

import { fonts } from './fonts';

export type StyledTextProps = TextProps;

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText {...props} style={[styles.text, style]} />;
};

interface IStyles {
  text: TextStyle;
}

const stylesDef: IStyles = {
  text: {
    fontFamily: fonts.inter.regular,
  },
};
const styles = StyleSheet.create(stylesDef);
