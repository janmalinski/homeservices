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
  AdCreate: TAdCreateParams;
};

export type TAdCreateParams = {
  latitude: number | undefined;
  longitude: number | undefined;
  address: string | undefined;
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
