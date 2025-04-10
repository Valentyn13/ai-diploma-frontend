import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_ID: 'userId',
  USER_TOKEN: 'userToken',
  USER_EMAIL: 'userEmail',
  GET_NOTIFICATIONS: 'getNotifications',
};

const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default {removeItem, getItem, saveItem, STORAGE_KEYS};
