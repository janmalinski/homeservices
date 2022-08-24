import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { colors } from './colors';

interface IIconProps {
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Icon = ({
  name,
  color = colors.primary,
  size,
  style,
  onPress,
}: IIconProps) => (
  <IonIcons
    name={name}
    color={color}
    size={size}
    style={style}
    onPress={onPress}
  />
);
