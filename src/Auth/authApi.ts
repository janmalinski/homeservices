import { publicApi } from '@src/Api/publicApi';
import { AuthDto } from './auth.dto';

type TRegister = (args: {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userType: string;
  language: string;
}) => Promise<AuthDto.registerDetails>;

export const register: TRegister = async ({
  email,
  password,
  termsAccepted,
  latitude,
  longitude,
  userType,
  language,
}) => {
  const response = await publicApi.post('/auth/signUp', {
    email,
    password,
    termsAccepted,
    latitude,
    longitude,
    userType,
    language,
  });
  return response.data.message;
};
