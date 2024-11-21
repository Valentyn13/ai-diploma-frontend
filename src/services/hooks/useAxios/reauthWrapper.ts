import { baseURL } from '@common/config';
import { setAccessToken } from '@store/actions';
import { getToken, storeToken } from '@utils/tokenHolder';
import { useDispatch } from 'react-redux';

import { refreshAccessToken } from '.';
import { useUser } from '../useUser';

export const checkIsTokenValid = async () => {
  const jwtToken = await getToken();
  return fetch(`${baseURL}auth-status`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

// Define the type for the callback function that makes an API request
type ApiRequestCallback<T extends any[]> = (...args: T) => Promise<Response>;

// The main function that accepts an async callback and its arguments

export const useRequestWithReauth = () => {
  const { user } = useUser();
  const dispatchAction = useDispatch();
  async function executeApiRequest<T extends any[], R>(
    callback: ApiRequestCallback<T>,
    ...args: T
  ): Promise<R | null> {
    try {
      const response = await callback(...args);

      if (response.status === 401) {
        const { accessToken, refreshToken } = await refreshAccessToken(
          user.id,
          user.email,
          user.refreshToken,
        );
        if (accessToken && refreshToken) {
          await storeToken(accessToken);
          dispatchAction(setAccessToken({ accessToken, refreshToken }));
          const newResponse = await callback(...args);
          if (!newResponse.ok) {
            return null;
          }
          return await newResponse.json();
        }
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }

  return {
    executeApiRequest,
  };
};
