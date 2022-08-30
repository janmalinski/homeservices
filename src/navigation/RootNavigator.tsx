import React, { useEffect } from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import { WelcomeScreen } from '@src/Welcome/WelcomeScreen';
import { AssessmentScreen } from '@src/Assessment/AssessmentScreen';
import { MapScreen } from '@src/Map/MapScreen/MapScreen';
import { RegisterScreen } from '@src/Auth/Register/RegisterScreen';
import { VerifyRegistrationCodeScreen } from '@src/Auth/VerifyRegistrationCode/VerifyRegistrationCodeScreen';
import { LoginScreen } from '@src/Auth/Login/LoginScreen';

import {
  TCreateAdParams,
  TMainTabParams,
  TMapScreenParams,
  TRegisterScreenParams,
} from './BottomTabs/BottomTabsNavigator';
import { InternetConnectionHandler } from '@src/Toast/InternetConnectionHandler';
import { GlobalToast } from '@src/Toast/GlobalToast';

export type TRootNavigatorParams = {
  ContentCreate: undefined;
  MainTab: NavigatorScreenParams<TMainTabParams>;
  ResetPassword: undefined;
  Assessment: undefined;
  Map: TMapScreenParams;
  CreateAd: TCreateAdParams;
  CreateAdMap: TMapScreenParams;
  Login: undefined;
  Register: TRegisterScreenParams;
  VerifyRegistrationCode: undefined;
  SingOutDialog: undefined;
  Storybook: undefined;
  Welcome: undefined;
  Account: undefined;
};

const Root = createStackNavigator<TRootNavigatorParams>();

export const RootNavigator = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name="Welcome" component={WelcomeScreen} />
        <Root.Screen name="Assessment" component={AssessmentScreen} />
        <Root.Screen name="Map" component={MapScreen} />
        <Root.Screen name="Register" component={RegisterScreen} />
        <Root.Screen
          name="VerifyRegistrationCode"
          component={VerifyRegistrationCodeScreen}
        />
        <Root.Screen name="Login" component={LoginScreen} />
      </Root.Navigator>
      <GlobalToast />
      <InternetConnectionHandler />
    </NavigationContainer>
  );
};
