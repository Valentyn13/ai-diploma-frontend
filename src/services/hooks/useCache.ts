import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useCache = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedValue = await AsyncStorage.getItem(key);
        if (cachedValue !== null) {
          setValue(JSON.parse(cachedValue));
        }
      } catch (error) {
        console.error('Error reading from cache:', error);
      }
    };

    fetchData();
  }, [key]);

  const updateCache = async (newValue: T) => {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  };

  return [value, updateCache];
};

export default useCache;
