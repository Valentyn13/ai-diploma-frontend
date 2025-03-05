import { baseURL } from '@common/config';
import { ChatCategories } from '@store/useCategorizedChatFlowStore';
import { checkResponseOkStatus } from '@utils/checkResponseOkStatus';
import { getToken } from '@utils/tokenHolder';
import { SetStateAction } from 'react';
import { Message } from 'types/Chat';

type CreateDocumentChatRequestDto = {
  userId: string;
  document: string;
  input: string;
  chatName: string;
};

export const createDocumentChat = async ({
  userId,
  document,
  input,
  chatName,
}: CreateDocumentChatRequestDto) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}document-chats/create/sse?userId=${userId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      document,
      input,
      chatName,
    }),
  });
};

export const fetchAllDocumentChats = async (userId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}document-chats/?userId=${userId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export const fetchDocumentChat = async (chatId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}document-chats/${chatId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export const deleteChat = async (chatId: string) => {
  const jwtToken = await getToken();

  return fetch(`${baseURL}document-chats/${chatId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export const streamDocumentResponse = async (
  chatId: string,
  message: Message,
  setAccumulatedText: (value: SetStateAction<string>) => void,
  setDisableUserInput: (value: SetStateAction<boolean>) => void,
) => {
  console.log('Starting stream, send message');
  setAccumulatedText('');
  const jwtToken = await getToken();
  const response = await fetch(
    `${baseURL}document-chats/message/sse/${chatId}`,
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
