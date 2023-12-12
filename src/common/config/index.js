import { HOST, PORT } from '@env';

const baseURL = `http://${HOST}:${PORT}/v1/`;

const BG_MUSIC_URL =
  'https://regameditation.s3.us-east-2.amazonaws.com/OceanSounds.mp3';
export default {
  baseURL,
  BG_MUSIC_URL,
};
