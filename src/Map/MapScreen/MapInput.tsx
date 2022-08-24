import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors, spacing } from '@src/components';

interface Props {
  onAddressChange: (details: GooglePlaceDetail) => void;
}
export const MapInput = ({ onAddressChange }: Props) => {
  const ref = useRef<any>(null);

  const [t] = useTranslation();

  const handleOnPressInput = useCallback(
    (details: GooglePlaceDetail) => {
      onAddressChange(details);
      ref?.current?.setAddressText('');
    },
    [onAddressChange],
  );

  const handleOnPressIcon = () => ref?.current?.focus();

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder={t('map.searchOrMoveTheMap')}
      minLength={2}
      listViewDisplayed
      fetchDetails
      nearbyPlacesAPI="GooglePlacesSearch"
      enablePoweredByContainer={false}
      debounce={200}
      renderDescription={row => row.description}
      onPress={(_data, details = null) => {
        handleOnPressInput(details as GooglePlaceDetail);
      }}
      query={{
        key: Config.GOOGLE_API_KEY,
        language: 'en',
      }}
      renderRightButton={() => (
        <View style={styles.searchIconContainer}>
          <Icon
            name="search-outline"
            color={colors.textPrimary}
            size={16}
            onPress={handleOnPressIcon}
          />
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  searchIconContainer: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: spacing.small,
    backgroundColor: colors.white,
  },
});
