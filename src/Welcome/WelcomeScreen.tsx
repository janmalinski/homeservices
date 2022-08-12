import React, { useCallback } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image, { ImageStyle } from 'react-native-fast-image';

import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { Button, Text } from '@src/components';
import { WelcomeScreenStyles as styles } from './WelcomeScreenStyles';

export const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<TRootNavigatorParams>>();

  const navigateSignInScreen = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const navigateToLocationScreen = useCallback(() => {
    navigation.navigate('Location');
  }, [navigation]);

  const Header = (
    <View style={styles.header}>
      <SafeAreaView style={styles.headerInner} edges={['top']}>
        <Image
          source={require('../assets/bootsplash_logo.png')}
          style={styles.brand as StyleProp<ImageStyle>}
        />
        <Text style={styles.headerText}>Hire Home Help</Text>
      </SafeAreaView>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://media.istockphoto.com/photos/nothing-is-better-than-team-work-picture-id590277932?s=612x612',
      }}
      resizeMode="cover"
      style={styles.imageBackground}>
      <View style={styles.container}>
        {Header}
        <Text style={styles.title}>Find home help in 10 minutes</Text>
        <View style={styles.subContainer}>
          <Button
            title="Start"
            isFullWidth
            onPress={navigateToLocationScreen}
          />
          <TouchableOpacity style={styles.row} onPress={navigateSignInScreen}>
            <Text style={styles.paragraph}>Already have an account?</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.paragraph}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
