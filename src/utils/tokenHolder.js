import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'REGA@Token';

export const storeToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.log('failed to save token');
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.log('failed to get token');
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.log('failed to clear token');
  }
};
