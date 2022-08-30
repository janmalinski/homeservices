import React, { useRef, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { ICoordinates } from './MapScreen';

interface IMapProps {
  addressChangedByInput: boolean;
  coordinates: ICoordinates;
  onRegionChange: (reg: ICoordinates) => void;
  resetAddressChangedByInput: (value: boolean) => void;
}

export const Map = ({
  addressChangedByInput,
  coordinates,
  onRegionChange,
  resetAddressChangedByInput,
}: IMapProps) => {
  const [panDrag, setPanDrag] = useState(false);
  const mapRef = useRef(null);

  const handleRegionChangeComplete = (location: ICoordinates) => {
    if (
      location.latitude.toFixed(6) !== coordinates.latitude.toFixed(6) &&
      location.longitude.toFixed(6) !== coordinates.longitude.toFixed(6)
    ) {
      return onRegionChange(location);
    } else if (addressChangedByInput) {
      onRegionChange(location);
      return resetAddressChangedByInput(false);
    }
    return;
  };
  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={coordinates}
        mapType="standard"
        zoomEnabled
        showsMyLocationButton
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        minZoomLevel={5}
        onPanDrag={() => setPanDrag(true)}
        onPress={() => setPanDrag(true)}
        onRegionChangeComplete={handleRegionChangeComplete}>
        <Marker coordinate={coordinates} />
      </MapView>
    </>
  );
};

interface IStyles {
  map: ViewStyle;
}

const stylesDef: IStyles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

const styles = StyleSheet.create(stylesDef);
