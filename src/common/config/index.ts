import { DEV_HOST, HOST } from '@env';

const baseURL = `https://${HOST}/v1/`;
const isDev = process.env.NODE_ENV === 'development';

export default {
  baseURL,
  isDev,
};

export { baseURL, isDev };
