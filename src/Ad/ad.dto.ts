import { UserDto } from '@src/User/user.dto';

export namespace AdDto {
  export type ServiceDetails = {
    id: string;
    name: string;
  };

  export type TypeOfEmployment = {
    id: string;
    name: string;
  };

  export type AdDetails = {
    id: string;
    description: string;
    services: ServiceDetails[];
    typesOfEmployment: TypeOfEmployment[];
    workingTimeNegotiable: boolean;
    workingTime: UserDto.AvailabilityTime[];
    latitude: number;
    longitude: number;
    address: number;
  };
}
