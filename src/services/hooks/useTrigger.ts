import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useTrigger = (
  callback: () => void,
  triggerKey: string,
  triggerNumber: number,
): (() => void) => {
  const triggerWrapper = useCallback(async () => {
    try {
      const sessionCountString = await AsyncStorage.getItem(triggerKey);
      const sessionCount = sessionCountString
        ? parseInt(sessionCountString, 10)
        : 0;

      if ((sessionCount + 1) % triggerNumber === 0) {
        callback();
      }

      await AsyncStorage.setItem(triggerKey, `${sessionCount + 1}`);
    } catch (error) {
      console.error('An error occurred while accessing AsyncStorage:', error);
    }
  }, [callback, triggerKey, triggerNumber]);

  return triggerWrapper;
};

export default useTrigger;
