import { HOST, PORT } from '@env';

const baseURL = `http://${HOST}:${PORT}/v1/`;
const isDev = process.env.NODE_ENV === 'development';

export { baseURL, isDev };
