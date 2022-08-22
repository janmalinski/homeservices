import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

import { colors, spacing } from '@src/components';

interface IStyles {
  imageBackground: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  headerInner: ViewStyle;
  brand: ImageStyle;
  title: TextStyle;
  paragraph: TextStyle;
  container: ViewStyle;
  subContainer: ViewStyle;
  row: ViewStyle;
  linkContainer: ViewStyle;
  button: ViewStyle;
}

const stylesDef: IStyles = {
  imageBackground: { width: '100%', height: '100%' },
  header: {
    flex: 1,
  },
  headerText: {
    color: colors.white,
    textAlign: 'center',
  },
  headerInner: {
    paddingTop: spacing.xLarge,
    alignItems: 'center',
  },
  brand: {
    width: 156,
    height: 100,
    resizeMode: 'contain',
    marginBottom: spacing.large,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  paragraph: {
    lineHeight: spacing.large,
    color: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
  },
  linkContainer: {
    marginLeft: 3,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  button: {
    width: 256,
  },
};

export const WelcomeScreenStyles = StyleSheet.create(stylesDef);
