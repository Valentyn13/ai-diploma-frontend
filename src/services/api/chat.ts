import { baseURL } from '@common/config';
import { jwtToken } from '@services/hooks/useAxios/index';
import { checkResponseOkStatus } from '@utils/checkResponseOkStatus';
import { SetStateAction } from 'react';
import { ChatForDrawer, Message, Session } from 'types/Chat';

export const fetchChats = async (userId: string) => {
  const response = await fetch(`${baseURL}chats/?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });

  checkResponseOkStatus(response);

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

  checkResponseOkStatus(response);

  const data = (await response.json()) as Session;
  return data;
};

export const streamAiResponse = async (
  chatId: string,
  message: Message,
  setAccumulatedText: (value: SetStateAction<string>) => void,
  setDisableUserInput: (value: SetStateAction<boolean>) => void,
) => {
  setAccumulatedText('');
  const response = await fetch(`${baseURL}chats/message/sse/${chatId}`, {
    method: 'POST',
    reactNative: {
      textStreaming: true,
    },
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ input: message.content }),
  });

  checkResponseOkStatus(response);

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) {
    console.log('No reader');
    return;
  }

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      setDisableUserInput(false);
      break;
    }

    if (!value) {
      continue;
    }

    const text = decoder.decode(value, { stream: true });
    setAccumulatedText(prev => (prev += text));
  }
};

export const createSseChat = async (userId: string, message: Message) => {
  const response = await fetch(`${baseURL}chats/create/sse?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ input: message.content }),
  });

  checkResponseOkStatus(response);

  const data = (await response.json()) as Session;

  return data;
};

export const deleteChat = async (chatId: string) => {
  await fetch(`${baseURL}chats/${chatId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'content-type': 'application/json',
    },
  });

  return true;
};
