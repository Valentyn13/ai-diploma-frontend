import { KEY_PLAYED_FIRST } from '@common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firstCourseSelector } from '@store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const KEY_SECOND_TIME = 'secondTime';

export const useOnboarding = (navigation: any) => {
  const [isOldUser, setIsOldUser] = useState(true);
  const [playedFirst, setPlayedFirst] = useState(true);
  const firstCourse = useSelector<any, any>(firstCourseSelector);

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

  useEffect(() => {
    if (!isOldUser && !playedFirst && firstCourse.meditations.length) {
      navigation.replace('Main', {
        screen: 'MeditationPlayer',
        params: {
          item: firstCourse.meditations[0],
          isFirstTime: true,
        },
      });
    }
  }, [isOldUser, firstCourse, playedFirst, navigation]);

  const updateIsOldUser = async (isOld = true) => {
    setIsOldUser(isOld);
    AsyncStorage.setItem(KEY_SECOND_TIME, isOld.toString());
  };

  return {
    isOldUser,
    updateIsOldUser,
  };
};
