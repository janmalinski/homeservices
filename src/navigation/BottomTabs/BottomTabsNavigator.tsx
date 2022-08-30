import { NavigatorScreenParams } from '@react-navigation/native';

export type TBottomTabsNavigatorParams = {
  ContentCreate: undefined;
  MainTab: NavigatorScreenParams<TMainTabParams>;
  ResetPassword: undefined;
  Location: undefined;
  Map: TMapScreenParams;
  CreateAd: TCreateAdParams;
  CreateAdMap: TMapScreenParams;
  Login: undefined;
  Register: TRegisterScreenParams;
  RegistrationCodeSignUp: undefined;
  SingOutDialog: undefined;
  Storybook: undefined;
  Welcome: undefined;
  Account: undefined;
};

export type TMainTabParams = {
  AdList: undefined;
  CreateAd: TCreateAdParams;
  Settings: undefined;
};

export type TMapScreenParams = {
  redirectAfterSubmit: 'Register' | 'AdCreate';
  userRole: {
    id: string;
    name: string;
  };
};

export type TCreateAdParams = {
  latitude?: number;
  longitude?: number;
  address?: string;
};

export type TCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export interface TRegisterScreenParams
  extends Pick<TMapScreenParams, 'userRole'>,
    Pick<TCoordinates, 'latitude' | 'longitude'> {}
