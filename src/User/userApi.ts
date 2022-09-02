import { protectedApi } from '@src/Api/protectedApi';
import { UserDto } from './user.dto';

type TUser = () => Promise<UserDto.userDetails>;
export const getUser: TUser = async () => {
  const response = await protectedApi.get('/user');
  return response.data.user;
};
