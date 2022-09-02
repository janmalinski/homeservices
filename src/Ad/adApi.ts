import { protectedApi } from '@src/Api/protectedApi';
import { AdDto } from './ad.dto';

type TServices = () => Promise<AdDto.ServiceDetails[]>;
export const getServices: TServices = async () => {
  const response = await protectedApi.get('/service');
  return response.data.services;
};
