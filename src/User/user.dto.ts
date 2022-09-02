export namespace UserDto {
  type UserRoleItem = {
    id: string;
    name: string;
  };

  export type AvailabilityTime = {
    '06-09': boolean;
    '09-12': boolean;
    '12-15': boolean;
    '15-18': boolean;
    '18-21': boolean;
    '21-24': boolean;
    night: boolean;
  };

  type UserAd = {
    id: string;
    description: string;
    availableFrom: Date;
    availableTo: Date;
    latitude: number;
    longitude: number;
    address: string;
    availability: {
      negotiable: boolean;
      time: AvailabilityTime[];
    };
  };

  export type userDetails = {
    id: string;
    email: string;
    phoneNumber: number | null;
    phoneNumberConsent: boolean | null;
    avatarUrl: string | null;
    ads: UserAd[];
    roles: UserRoleItem[];
  };
}
