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

type TVerifyRegistrationCode = (
  code: string,
) => Promise<AuthDto.verifyRegistrationCodeDetails>;

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

export const verifyRegistrationCode = async (code: TVerifyRegistrationCode) => {
  const response = await publicApi.post('/auth/verify', {
    code,
  });
  return response.data.message;
};
