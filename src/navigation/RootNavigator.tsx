import React, { useEffect, useState } from 'react';
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
import { AccountScreen } from '@src/Settings/AccountScreen/AccountScreen';

import {
  BottomTabsNavigator,
  TBottomTabsNavigatorParams,
} from './BottomTabs/BottomTabsNavigator';
import { InternetConnectionHandler } from '@src/Toast/InternetConnectionHandler';
import { GlobalToast } from '@src/Toast/GlobalToast';
import { useAppDispatch } from '@src/store';
import { useGetToken } from '@src/utils/hooks/useGetToken';
import { AppState } from 'react-native';
import { checkAuthTokenExpirationThunk } from '@src/Auth/authStore';

export type TMapScreenParams = {
  redirectAfterSubmit: 'Register' | 'AdCreate';
  userRole: {
    id: string;
    name: string;
  };
};
export interface TRegisterScreenParams
  extends Pick<TMapScreenParams, 'userRole'>,
    Pick<TCoordinates, 'latitude' | 'longitude'> {}

export type TCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type TRootNavigatorParams = {
  Tabs: NavigatorScreenParams<TBottomTabsNavigatorParams>;
  ResetPassword: undefined;
  Assessment: undefined;
  Map: TMapScreenParams;
  Login: undefined;
  Register: TRegisterScreenParams;
  VerifyRegistrationCode: undefined;
  Welcome: undefined;
  AdCreateMap: TMapScreenParams;
  Account: undefined;
};

export type TNavParams = TRootNavigatorParams & TBottomTabsNavigatorParams;

const Root = createStackNavigator<TRootNavigatorParams>();

export const RootNavigator = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const dispatch = useAppDispatch();

  const token = useGetToken();

  useEffect(() => {
    RNBootSplash.hide();
    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          dispatch(checkAuthTokenExpirationThunk());
        }
        setAppState(nextAppState);
      },
    );

    return () => appStateSubscription.remove();
  }, [appState, dispatch]);

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
    <>
      <Root.Screen name="Tabs" component={BottomTabsNavigator} />
      <Root.Screen name="AdCreateMap" component={MapScreen} />
      <Root.Screen name="Account" component={AccountScreen} />
    </>
  );

  return (
    <>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          {token?.length > 0 ? authorizedScreens : welcomeScreens}
        </Root.Navigator>
        <GlobalToast />
        <InternetConnectionHandler />
      </NavigationContainer>
    </>
  );
};
