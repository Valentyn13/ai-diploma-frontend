import { Session } from 'types/Chat';

const CHATS_URL = 'https://rega.co.il/api/chats';

export const fetchChats = async (userId: string) => {
  const response = await fetch(`${CHATS_URL}?userId=${userId}`);
  const data = await response.json();

  return data.chats as Session[];
};

export const fetchChat = async (chatId: string) => {
  const response = await fetch(`${CHATS_URL}/${chatId}`);
  const data = await response.json();

  return data as Session;
};
