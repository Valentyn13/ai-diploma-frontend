import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

export const useOnboarding = () => {
  const [isOldUser, setIsOldUser] = useState(true);
  const { navigate } = useNavigation();
  const firstCourse = useSelector<any, any>(firstCourseSelector);

  useEffect(() => {
    const fetchIsOldUser = async () => {
      const isOldUserCache = await AsyncStorage.getItem('secondTime');
      if (!isOldUserCache) {
        setIsOldUser(false);
      }
    };

    fetchIsOldUser();
  }, []);

  useEffect(() => {
    if (!isOldUser && firstCourse && firstCourse.meditations?.length) {
      // @ts-ignore
      navigate('Main', {
        screen: 'MeditationPlayer',
        params: {
          item: firstCourse.meditations[0],
        },
      });

      setIsOldUser(true);
      AsyncStorage.setItem('secondTime', 'true');
    }
  }, [isOldUser, firstCourse, navigate]);
};
