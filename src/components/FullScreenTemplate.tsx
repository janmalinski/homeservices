import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from './index';

import { KeyboardAvoidingComponent } from './KeyboardAvoidingComponent';
import { Spinner } from './Spinner';

export interface IFullScreenTemplateProps {
  children?: React.ReactNode;
  padded?: boolean;
  safeArea?: boolean;
  bottomNavigationPad?: boolean;
  noScroll?: boolean;
  isLoading?: boolean;
  contentContainerStyle?: ViewStyle;
  header?: React.ReactNode;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
}

export const FullScreenTemplate: React.FC<IFullScreenTemplateProps> = ({
  children,
  padded,
  safeArea,
  bottomNavigationPad,
  noScroll,
  isLoading,
  contentContainerStyle,
  header,
  keyboardShouldPersistTaps,
}) => {
  const RootView = safeArea ? SafeAreaView : View;
  const Container = noScroll ? View : KeyboardAvoidingComponent;

  return (
    <RootView style={styles.mainContainer} edges={['top']}>
      {header}
      <Container
        bounces={false}
        extraScrollHeight={Platform.select({ ios: 32, android: 0 })}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[
          padded && styles.padded,
          bottomNavigationPad && styles.bottomNavigationPad,
          contentContainerStyle,
        ]}
        style={[
          styles.container,
          noScroll && styles.containerNoScroll,
          noScroll && padded && styles.padded,
          noScroll && bottomNavigationPad && styles.bottomNavigationPad,
          noScroll && contentContainerStyle,
        ]}>
        {isLoading && <Spinner />}
        {!isLoading && children}
      </Container>
    </RootView>
  );
};

interface IStyles {
  mainContainer: ViewStyle;
  container: ViewStyle;
  containerNoScroll: ViewStyle;
  padded: ViewStyle;
  bottomNavigationPad: ViewStyle;
  loadingContainer: ViewStyle;
}

const stylesDef: IStyles = {
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
  },
  containerNoScroll: {
    flex: 1,
  },
  padded: {
    padding: spacing.large,
  },
  bottomNavigationPad: {
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const styles = StyleSheet.create(stylesDef);
