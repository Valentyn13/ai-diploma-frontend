import { baseURL } from '@common/config';
import { jwtToken } from '@services/hooks/useAxios/index';
import { ChatForDrawer, Message, Session } from 'types/Chat';

export const fetchChats = async (userId: string) => {
  const response = await fetch(`${baseURL}chats/?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  return data as ChatForDrawer[];
};

export const fetchChat = async (chatId: string) => {
  const response = await fetch(`${baseURL}chats/${chatId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });

  const data = (await response.json()) as Session;
  return data;
};

export const addMessageToChat = async (chatId: string, message: Message) => {
  const response = await fetch(`${baseURL}chats/message/${chatId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ input: message.content }),
  });

  const data = await response.json();

  return data as Message;
};

export const createChat = async (userId: string, message: Message) => {
  const response = await fetch(`${baseURL}chats/create?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ input: message.content }),
  });

  const data = (await response.json()) as Session;

  return data;
};

export const deleteChat = async (chatId: string) => {
  const response = await fetch(`${baseURL}chats/${chatId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });

  return response;
};
