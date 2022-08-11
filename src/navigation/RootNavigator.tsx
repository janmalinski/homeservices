import React, { useEffect } from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import { WelcomeScreen } from '../Welcome/WelcomeScreen';
import {
  TCreateAdParams,
  TMainTabParams,
  TMapScreenParams,
  TSignUpScreenParams,
} from './BottomTabs/BottomTabsNavigator';

export type TRootNavigatorParams = {
  ContentCreate: undefined;
  MainTab: NavigatorScreenParams<TMainTabParams>;
  ResetPassword: undefined;
  Location: undefined;
  Map: TMapScreenParams;
  CreateAd: TCreateAdParams;
  CreateAdMap: TMapScreenParams;
  SignIn: undefined;
  SignUp: TSignUpScreenParams;
  RegistrationCodeSignUp: undefined;
  SingOutDialog: undefined;
  Storybook: undefined;
  Welcome: undefined;
  Account: undefined;
};

const Root = createStackNavigator<TRootNavigatorParams>();

export const RootNavigator = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Welcome" component={WelcomeScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
};
