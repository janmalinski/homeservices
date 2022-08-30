import { publicApi } from '@src/Api/publicApi';
import { AuthDto } from './auth.dto';

type TRegister = (args: {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userRoleId: string;
  language: string;
}) => Promise<AuthDto.registerDetails>;

type TVerifyRegistrationCode = (
  code: string,
) => Promise<AuthDto.verifyRegistrationCodeDetails>;

export const register: TRegister = async ({
  email,
  password,
  termsAccepted,
  latitude,
  longitude,
  userRoleId,
  language,
}) => {
  const response = await publicApi.post('/auth/signUp', {
    email,
    password,
    termsAccepted,
    latitude,
    longitude,
    userRoleId,
    language,
  });
  return response.data.message;
};

export const verifyRegistrationCode: TVerifyRegistrationCode = async code => {
  const response = await publicApi.post('/auth/verify', {
    code,
  });
  return response.data.message;
};
