import { HOST, PORT, DEV_HOST } from '@env';

const baseURL = `http://${HOST}:${PORT}/v1/`;
const isDev = process.env.NODE_ENV === 'development';
const chatApi = 'https://rega.co.il/api/chats';

export default {
  baseURL,
  isDev,
  chatApi,
};

export { baseURL, chatApi, isDev };
