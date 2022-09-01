import React, { useState, useEffect, useCallback } from 'react';
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
import { ResetPasswordScreen } from '@src/Auth/ResetPassword/ResetPasswordScreen';

import {
  BottomTabsNavigator,
  TBottomTabsNavigatorParams,
  TCreateAdParams,
  TMapScreenParams,
  TRegisterScreenParams,
} from './BottomTabs/BottomTabsNavigator';
import { InternetConnectionHandler } from '@src/Toast/InternetConnectionHandler';
import { GlobalToast } from '@src/Toast/GlobalToast';
import { useAppSelector } from '@src/store';
import { SecureStorage } from '@src/utils';

export type TRootNavigatorParams = {
  Tabs: NavigatorScreenParams<TBottomTabsNavigatorParams>;
  ContentCreate: undefined;
  MainTab: NavigatorScreenParams<TBottomTabsNavigatorParams>;
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
  const isLoginSuccess = useAppSelector(state => state.auth.loginSuccess);

  const [token, setToken] = useState<string>('');

  const getToken = useCallback(async () => {
    const accessToken = await SecureStorage.read('ACCESS_TOKEN');
    if (isLoginSuccess && accessToken && accessToken.length > 0) {
      setToken(accessToken);
    } else {
      setToken('');
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    RNBootSplash.hide();
    getToken();
  }, [getToken]);

  useEffect(() => {
    getToken();
  }, [isLoginSuccess, getToken]);

  const welcomeScreens = (
    <>
      <Root.Screen name="Welcome" component={WelcomeScreen} />
      <Root.Screen name="Assessment" component={AssessmentScreen} />
      <Root.Screen name="Map" component={MapScreen} />
      <Root.Screen name="Register" component={RegisterScreen} />
      <Root.Screen
        name="VerifyRegistrationCode"
        component={VerifyRegistrationCodeScreen}
      />
      <Root.Screen name="Login" component={LoginScreen} />
      <Root.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </>
  );

  const authorizedScreens = (
    <Root.Screen name="Tabs" component={BottomTabsNavigator} />
  );

  return (
    <>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          {token && token.length > 0 ? authorizedScreens : welcomeScreens}
        </Root.Navigator>
        <GlobalToast />
        <InternetConnectionHandler />
      </NavigationContainer>
    </>
  );
};
