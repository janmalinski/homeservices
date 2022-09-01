import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { AdListScreen } from '@src/Ad/AdList/AdListScreen';
import { AdCreateScreen } from '@src/Ad/AdCreate/AdCreateScreen';
import { useBottomNavDef } from './useBottomNavDef';
import { CustomTabBar } from './CustomTabBar';

export type TBottomTabsNavigatorParams = {
  AdList: undefined;
  AdCreate: undefined;
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
  const bottomNavDef = useBottomNavDef();

  const renderTabBar = useCallback(
    ({ state }: BottomTabBarProps) => {
      const tabs = bottomNavDef.map(r => ({
        routeName: r.routeName,
        isFocused: r.routeName === state.routes[state.index].name,
        label: r.label,
      }));
      return <CustomTabBar tabs={tabs} />;
    },
    [bottomNavDef],
  );

  return (
    <BottomTabs.Navigator
      tabBar={renderTabBar}
      screenOptions={{ headerShown: false }}>
      <BottomTabs.Screen
        name={bottomNavDef[0].routeName}
        component={AdListScreen}
      />
      <BottomTabs.Screen
        name={bottomNavDef[1].routeName}
        component={AdCreateScreen}
      />
    </BottomTabs.Navigator>
  );
};
