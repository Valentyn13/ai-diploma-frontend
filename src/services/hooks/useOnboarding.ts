import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

export const useOnboarding = () => {
  const { navigate } = useNavigation();
  const firstCourse = useSelector<any, any>(firstCourseSelector);

  const fetchIsOldUser = useCallback(async () => {
    const isOldUser = await AsyncStorage.getItem('secondTime');

    if (!isOldUser) {
      AsyncStorage.setItem('secondTime', 'true');
      console.log('!isOldUser', true);
      if (firstCourse && firstCourse.meditations?.length) {
        console.log('firstCourse', true);
        const courseMeditations = firstCourse.meditations;

        navigate('Main', {
          screen: 'MeditationPlayer',
          params: {
            item: courseMeditations[0],
            autoPlay: true,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchIsOldUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
