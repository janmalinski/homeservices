import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

export const WelcomeScreen = () => {
  const Header = (
    <View style={styles.header}>
      <Text>TEST</Text>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://media.istockphoto.com/photos/nothing-is-better-than-team-work-picture-id590277932?s=612x612',
      }}
      resizeMode="cover"
      style={styles.imageBackground}>
      <View>{Header}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: { width: '100%', height: '100%' },
  header: {
    flex: 1,
  },
});
