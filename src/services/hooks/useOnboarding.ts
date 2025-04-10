import { KEY_PLAYED_FIRST } from '@common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const KEY_SECOND_TIME = 'secondTime';

export const useOnboarding = () => {
  const [isOldUser, setIsOldUser] = useState(true);
  const [, setPlayedFirst] = useState(true);

  useEffect(() => {
    const fetchIsOldUser = async () => {
      const isOldUserCache = await AsyncStorage.getItem(KEY_SECOND_TIME);
      if (!isOldUserCache) {
        setIsOldUser(false);
      }
    };

    fetchIsOldUser();
  }, []);

  useEffect(() => {
    const fetchIsFirstPlayed = async () => {
      const isPlayedFirstCache = await AsyncStorage.getItem(KEY_PLAYED_FIRST);
      if (!isPlayedFirstCache) {
        setPlayedFirst(false);
      }
    };

    fetchIsFirstPlayed();
  }, []);


  const updateIsOldUser = async (isOld = true) => {
    setIsOldUser(isOld);
    AsyncStorage.setItem(KEY_SECOND_TIME, isOld.toString());
  };

  return {
    isOldUser,
    updateIsOldUser,
  };
};
