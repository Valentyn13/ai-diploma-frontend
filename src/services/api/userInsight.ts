import { baseURL } from '@common/config';
import { PollResult, starterChatQuestions } from '@store/useStarterChatStore';
import { getToken } from '@utils/tokenHolder';

export const getStarterChatQuestions = async () => {
  const jwtToken = await getToken();

  const response = await fetch(`${baseURL}user-insights/starter/questions`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const data = (await response.json()) as starterChatQuestions;

  return data;
};

export const sendStarterChatData = async (data: PollResult, userId: string) => {
  const jwtToken = await getToken();

  const response = await fetch(
    `${baseURL}user-insights/starter/submit/${userId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = (await response.json()) as { ok: boolean };

  return result;
};
