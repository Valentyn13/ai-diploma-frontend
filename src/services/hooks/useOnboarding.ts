import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { firstCourseSelector } from '@store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const KET_SECOND_TIME = 'secondTime';

export const useOnboarding = () => {
  const [isOldUser, setIsOldUser] = useState(true);
  const { navigate } = useNavigation();
  const firstCourse = useSelector<any, any>(firstCourseSelector);

  useEffect(() => {
    const fetchIsOldUser = async () => {
      const isOldUserCache = await AsyncStorage.getItem(KET_SECOND_TIME);
      if (!isOldUserCache) {
        setIsOldUser(false);
      }
    };

    fetchIsOldUser();
  }, []);

  useEffect(() => {
    if (!isOldUser && firstCourse?.meditations?.length) {
      setTimeout(() => {
        // @ts-ignore
        navigate('Main', {
          screen: 'MeditationPlayer',
          params: {
            item: firstCourse.meditations[0],
            isFirstTime: true,
          },
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOldUser, firstCourse.meditations]);

  const updateIsOldUser = async (isOld = true) => {
    setIsOldUser(isOld);
    AsyncStorage.setItem(KET_SECOND_TIME, isOld.toString());
  };

  return {
    isOldUser,
    updateIsOldUser,
  };
};
