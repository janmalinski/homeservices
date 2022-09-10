import { protectedApi } from '@src/Api/protectedApi';
import { UserDto } from '@src/User/user.dto';
import { AdDto } from './ad.dto';

type TServices = () => Promise<AdDto.ServiceDetails[]>;

type TCreateAd = (args: {
  description: string;
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  workingTimeNegotiable: boolean;
  workingTime: UserDto.AvailabilityTime[];
  address: string;
  latitude: number;
  longitude: number;
}) => Promise<AdDto.AdDetails>;

export const getServices: TServices = async () => {
  const response = await protectedApi.get('/service');
  return response.data.services;
};

export const createAd: TCreateAd = async ({
  description,
  serviceIds,
  employmentTypeIds,
  dateAvailableFrom,
  fixedTerm,
  dateAvailableTo,
  workingTimeNegotiable,
  workingTime,
  address,
  latitude,
  longitude,
}) => {
  const response = await protectedApi.post('/ad/create', {
    description,
    serviceIds,
    employmentTypeIds,
    dateAvailableFrom,
    fixedTerm,
    dateAvailableTo,
    workingTimeNegotiable,
    workingTime,
    address,
    latitude,
    longitude,
  });
  return response.data.ad;
};
