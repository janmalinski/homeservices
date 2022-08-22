import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  Text as RNText,
  TextStyle,
} from 'react-native';

import {
  fontWeights,
  textAligns,
  typographies,
  colors,
  textDecorationLines,
} from './styles';

interface ITextProps {
  typography: keyof typeof typographies;
  fontWeight?: keyof typeof fontWeights;
  textAlign?: keyof typeof textAligns;
  color?: keyof typeof colors;
  textDecorationLine?: keyof typeof textDecorationLines;
  numberOfLines?: number;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export const Text: React.FC<ITextProps> = ({
  children,
  typography,
  fontWeight = 'regular',
  textAlign = 'auto',
  color = 'textPrimary',
  textDecorationLine = 'none',
  style,
  onLayout,
  numberOfLines,
}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      onLayout={onLayout}
      maxFontSizeMultiplier={1.5}
      style={[
        typographies[typography],
        fontWeights[fontWeight],
        textAligns[textAlign],
        colors[color],
        textDecorationLines[textDecorationLine],
        style,
      ]}>
      {children}
    </RNText>
  );
};
