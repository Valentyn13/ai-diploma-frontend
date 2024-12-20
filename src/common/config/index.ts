import { DEV_HOST, HOST, PORT } from '@env';

const baseURL = `http://${HOST}:${PORT}/v1/`;
const isDev = process.env.NODE_ENV === 'development';

export default {
  baseURL,
  isDev,
};

export { baseURL, isDev };
