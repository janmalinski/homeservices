import { publicApi } from '@src/Api/publicApi';
import { AuthDto } from './auth.dto';

type TRegister = (args: {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userTypeId: string;
  language: string;
}) => Promise<AuthDto.registerDetails>;

export const register: TRegister = async ({
  email,
  password,
  termsAccepted,
  latitude,
  longitude,
  userTypeId,
  language,
}) => {
  const response = await publicApi.post('/auth/signUp', {
    email,
    password,
    termsAccepted,
    latitude,
    longitude,
    userTypeId,
    language,
  });
  return response.data.message;
};
