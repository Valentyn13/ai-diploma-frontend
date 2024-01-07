import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';

import useCache from './useCache';

export const useOnboarding = () => {
  const [isOldUser, setIsOldUser] = useCache<boolean>('secondTime', true);
  const { navigate } = useNavigation();
  const firstCourse = useSelector<any, any>(firstCourseSelector);

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
    }
  }, [isOldUser, firstCourse, navigate, setIsOldUser]);
};
