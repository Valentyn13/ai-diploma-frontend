import { baseURL } from '@common/config';

export const getLatestSessionId = async (userId: string) => {
  const response = await fetch(`${baseURL}chats/id/latest?userId=${userId}`, {
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = (await response.json()) as {
    lastActiveSessionId: string | null;
  };

  return data.lastActiveSessionId;
};
