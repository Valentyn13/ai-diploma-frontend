import CryptoJS from 'react-native-crypto-js';

export const generateUUID = () =>
  CryptoJS.lib.WordArray.random(128 / 8).toString();
