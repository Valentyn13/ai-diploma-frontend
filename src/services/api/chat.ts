import { chatApi } from '@common/config';
import { jwtToken } from '@services/hooks/useAxios/index';
import { Session } from 'types/Chat';

export const fetchChats = async (userId: string) => {
  const response = await fetch(`${chatApi}?userId=${userId}&limit=50`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });
  const data = await response.json();

  return data.chats as Session[];
};

export const fetchChat = async (chatId: string) => {
  const response = await fetch(`${chatApi}/${chatId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });

  const data = await response.json();

  return data as Session;
};
