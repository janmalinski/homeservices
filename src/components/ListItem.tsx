import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

import { colors, Text, textStyles, spacing, Avatar } from './index';

import { Icon, IIconProps } from './designSystem/Icon';

export interface ListItemProps {
  title?: string;
  subtitle?: string;
  raised?: boolean;
  border?: boolean;
  leftComponent?: 'avatar' | 'icon';
  rightComponent?: 'chevron' | 'close';
  avatarUri?: string;
  icon?: IIconProps;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  raised,
  border,
  leftComponent,
  rightComponent,
  avatarUri,
  icon,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, raised && styles.raised]}
      onPress={onPress}>
      {leftComponent === 'avatar' && avatarUri && <Avatar uri={avatarUri} />}

      {leftComponent === 'icon' && icon && (
        <Icon name={icon.name} color={colors.black} size={28} />
      )}

      <View style={leftComponent && styles.textContainerLeftPadding}>
        <Text typography="body">{title}</Text>
        <Text typography="caption1">{subtitle}</Text>
      </View>

      {rightComponent === 'chevron' && (
        <Icon
          name="chevron-forward-outline"
          color={colors.black}
          size={28}
          style={styles.rightIcon}
        />
      )}

      {rightComponent === 'close' && (
        <Icon
          name="close-outline"
          color={colors.black}
          size={28}
          style={styles.rightIcon}
        />
      )}

      {/*
      {rightComponent === 'switch' && switchProps && <Switch {...switchProps} />} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.tiny,
    backgroundColor: colors.gray90,
    paddingHorizontal: spacing.regular,
    paddingVertical: 11,
    minHeight: 52,
  },
  textContainerLeftPadding: {
    paddingLeft: spacing.regular,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
  raised: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  //   border: {
  //     borderWidth: 1,
  //     borderRadius: 4,
  //     color: palette.ListItem.default.border,
  //   },
  //   line: {
  //     borderBottomWidth: 1,
  //     borderBottomColor: palette.ListItem.default.line,
  //   },
  //   avatar: {
  //     width: 36,
  //     height: 36,
  //   },
  //   title: {
  //     ...typography.subtitle2,
  //   },
  //   subtitle: {
  //     ...typography.caption,
  //     color: palette.ListItem.default.subtitle,
  //   },
});
