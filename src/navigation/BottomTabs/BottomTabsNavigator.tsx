import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

import { AdListScreen } from '@src/Ad/AdList/AdListScreen';

// export type TBottomTabsNavigatorParams = {
//   ContentCreate: undefined;
//   MainTab: NavigatorScreenParams<TMainTabParams>;
//   ResetPassword: undefined;
//   Location: undefined;
//   Map: TMapScreenParams;
//   CreateAd: TCreateAdParams;
//   CreateAdMap: TMapScreenParams;
//   Login: undefined;
//   Register: TRegisterScreenParams;
//   RegistrationCodeSignUp: undefined;
//   SingOutDialog: undefined;
//   Storybook: undefined;
//   Welcome: undefined;
//   Account: undefined;
// };

export type TBottomTabsNavigatorParams = {
  AdList: undefined;
};

export type TMainTabParams = {
  AdList: undefined;
  CreateAd: TCreateAdParams;
  Settings: undefined;
};

export type TCreateAdParams = {
  latitude?: number;
  longitude?: number;
  address?: string;
};

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

const BottomTabs = createBottomTabNavigator<TBottomTabsNavigatorParams>();

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen name="AdList" component={AdListScreen} />
    </BottomTabs.Navigator>
  );
};
