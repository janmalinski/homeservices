import { protectedApi } from '@src/Api/protectedApi';
import { ChatDto } from './chat.dto';

type TCheckOrCreateRoom = (adId: string, authorId: string, userId: string) => Promise<string>;

type TGetMessages = (roomId: string) => Promise<ChatDto.Message[]>;

type TPostMessage = (text: string, roomId: string, senderId: string,) => Promise<number>;

export const checkOrCreateRoom: TCheckOrCreateRoom = async( adId, authorId, userId) => {
  const response = await protectedApi.post(`/room/${adId}/${authorId}/${userId}`);
  return response.data.roomId;
} 

export const getMessages: TGetMessages = async(roomId: string) => {
  const response = await protectedApi.get(`/room/${roomId}/messages`);
  return response.data.messages;
};

export const postMessage: TPostMessage = async(text, roomId, senderId) => {
  const response = await protectedApi.post(`/room/${roomId}/${senderId}`, {
        text,
      });
  return response.status;
};
