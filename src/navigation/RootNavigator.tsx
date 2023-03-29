import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { t } from 'i18next';

import { WelcomeScreen } from '@src/Welcome/WelcomeScreen';
import { AssessmentScreen } from '@src/Assessment/AssessmentScreen';
import { MapScreen } from '@src/Map/MapScreen/MapScreen';
import { RegisterScreen } from '@src/Auth/Register/RegisterScreen';
import { VerifyRegistrationCodeScreen } from '@src/Auth/VerifyRegistrationCode/VerifyRegistrationCodeScreen';
import { LoginScreen } from '@src/Auth/Login/LoginScreen';
import { ResetPasswordScreen } from '@src/Auth/ResetPassword/ResetPasswordScreen';
import { AccountScreen } from '@src/Settings/AccountScreen/AccountScreen';
import { AdListScreen } from '@src/Ad/AdList/AdListScreen';
import {
  BottomTabsNavigator,
  TBottomTabsNavigatorParams,
} from './BottomTabs/BottomTabsNavigator';
import { InternetConnectionHandler } from '@src/Toast/InternetConnectionHandler';
import { GlobalToast } from '@src/Toast/GlobalToast';
import { useAppDispatch } from '@src/store';
import { useGetToken } from '@src/utils/hooks/useGetToken';
import { checkAuthTokenExpirationThunk } from '@src/Auth/authStore';
import { defaultHeaderOptions } from './screenOptions';
import { colors } from '@src/components';
import AdDetailsScreen from '@src/Ad/AdDetails/AdDetailsScreen';
import { UserDto } from '@src/User/user.dto';
import { AdEditScreen } from '@src/Ad/AdEdit/AdEditScreen';
import { ChatScreen } from '@src/Chat/ChatScreen';
import { AuthorRoomListScreen } from '@src/Chat/AuthorRoomListScreen';
import { ChatDto } from '@src/Chat/chat.dto';

export type TMapScreenParams = {
  redirectAfterSubmit: 'Register' | 'AdCreate' | 'AdEdit' | 'Account';
  userRole?: {
    id: string;
    name: string;
  };
  ad?: any;
};
export interface IRegisterScreenParams
  extends Pick<TMapScreenParams, 'userRole'>,
    Pick<TCoordinates, 'latitude' | 'longitude'> {}

export type TCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export interface IAccount
  extends Partial<Pick<TCoordinates, 'latitude' | 'longitude'>> {
  address?: string;
}

export type TRootNavigatorParams = {
  Tabs: NavigatorScreenParams<TBottomTabsNavigatorParams>;
  ResetPassword: undefined;
  Assessment: undefined;
  Map: TMapScreenParams;
  Login: undefined;
  Register: IRegisterScreenParams;
  VerifyRegistrationCode: undefined;
  Welcome: undefined;
  AdMap: TMapScreenParams;
  Account: IAccount;
  AccountMap: TMapScreenParams;
  UserAdList: undefined;
  AdDetails: {
    ad: UserDto.UserAd;
    isAuthor: boolean;
  };
  Chat: {
    authorId: string;
    userId: string;
    adId: string;
    roomId?: string;
  };
  AuthorRoomList: {
    rooms: ChatDto.Room[];
    userId: string;
  };
  AdEdit: {
    ad: UserDto.UserAd;
    latitude?: number;
    longitude?: number;
    address?: string;
  };
};

export type TNavParams = TRootNavigatorParams & TBottomTabsNavigatorParams;

const Root = createStackNavigator<TRootNavigatorParams>();

export const dialogScreenOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  cardStyleInterpolator: () => ({
    overlayStyle: {
      backgroundColor: colors.opacity,
    },
  }),
};

export const headerOptions = {
  title: '',
  headerBackTitle: '',
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
};

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
      <Root.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Assessment"
        component={AssessmentScreen}
        options={headerOptions}
      />
      <Root.Screen name="Map" component={MapScreen} options={headerOptions} />
      <Root.Screen
        name="Register"
        component={RegisterScreen}
        options={headerOptions}
      />
      <Root.Screen
        name="VerifyRegistrationCode"
        component={VerifyRegistrationCodeScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen name="Login" component={LoginScreen} />
      <Root.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={headerOptions}
      />
    </>
  );

  const authorizedScreens = (
    <>
      <Root.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen name="AdMap" component={MapScreen} />
      <Root.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('settings.screenTitle'),
          headerTintColor: colors.black,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen name="AccountMap" component={MapScreen} />
      <Root.Screen
        name="UserAdList"
        component={AdListScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('settings.screenTitle'),
          headerTintColor: colors.black,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AdDetails"
        component={AdDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('userAdList.screenTitle'),
          headerTintColor: colors.black,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('adDetails.screenTitle'),
          headerTintColor: colors.black,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AuthorRoomList"
        component={AuthorRoomListScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('adDetails.screenTitle'),
          headerTintColor: colors.black,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AdEdit"
        component={AdEditScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </>
  );

  return (
    <>
      <NavigationContainer>
        <Root.Navigator initialRouteName="Welcome">
          {token?.length > 0 ? authorizedScreens : welcomeScreens}
        </Root.Navigator>
        <GlobalToast />
        <InternetConnectionHandler />
      </NavigationContainer>
    </>
  );
};
