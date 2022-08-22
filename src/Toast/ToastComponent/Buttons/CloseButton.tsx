import React from 'react';
import { Pressable, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { CLOSE_ICON_SIZE } from '../Constants';
import { colors } from '@src/components';
import styles from '../Styles';

export const CloseButton = (props: { onPress: () => void }) => (
  <Pressable hitSlop={20} style={styles.closeButton} onPress={props.onPress}>
    {({ pressed }) => (
      <>
        {pressed && <View style={styles.closeOverlay} />}
        <FontAwesome5Icon
          name="times"
          color={colors.textPrimary}
          size={CLOSE_ICON_SIZE}
        />
      </>
    )}
  </Pressable>
);
