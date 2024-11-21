import { baseURL } from '@common/config';
import { ChatCategories } from '@store/useCategorizedChatFlowStore';
import { checkResponseOkStatus } from '@utils/checkResponseOkStatus';
import { getToken } from '@utils/tokenHolder';
import { SetStateAction } from 'react';
import { Message } from 'types/Chat';

export const fetchChats = async (userId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}chats/?userId=${userId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export const fetchChat = async (chatId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}chats/${chatId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export const streamAiResponse = async (
  chatId: string,
  message: Message,
  chatCategory: ChatCategories = null,
  setAccumulatedText: (value: SetStateAction<string>) => void,
  setDisableUserInput: (value: SetStateAction<boolean>) => void,
) => {
  setAccumulatedText('');
  const jwtToken = await getToken();
  const response = await fetch(
    `${baseURL}chats/message/sse/${chatId}?chatType=${
      chatCategory ? chatCategory : ''
    }`,
    {
      method: 'POST',
      reactNative: {
        textStreaming: true,
      },
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ input: message.content }),
    },
  );

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
      setAccumulatedText('');
      break;
    }

    if (!value) {
      continue;
    }

    const text = decoder.decode(value, { stream: true });
    setAccumulatedText(prev => (prev += text));
  }
};

export const createSseChat = async (
  userId: string,
  message: Message,
  chatType: ChatCategories = null,
) => {
  const jwtToken = await getToken();

  return fetch(
    `${baseURL}chats/create/sse?userId=${userId}&chatType=${
      chatType ? chatType : ''
    }`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ input: message.content }),
    },
  );
};

export const deleteChat = async (chatId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}chats/${chatId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};
