import { baseURL } from '@common/config';

export const getMinAppVersion = async () => {
  try {
    const response = await fetch(`${baseURL}app/minimum_app_version`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.version as string;
  } catch (error) {
    return null;
  }
};
