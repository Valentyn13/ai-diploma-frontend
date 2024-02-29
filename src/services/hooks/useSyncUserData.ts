import api from '@services/api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useAxios from './useAxios';
import { useUser } from './useUser';
import useUserData from './useUserData';

export default () => {
  const appDataloaded = useSelector(state => state.appData.loaded);
  const { user } = useUser();
  const userProgress = useSelector(state => state.userProgress);
  const userPreferences = useSelector(state => state.userPreferences);

  const { getUserData } = useUserData();

  const { fetch: syncUserPreferences } = useAxios({
    api: api.syncUserPreferences,
    shouldDispatch: () => false,
  });

  const { fetch: syncUserProgress } = useAxios({
    api: api.syncUserProgress,
    shouldDispatch: () => false,
  });

  useEffect(() => {
    if (appDataloaded && user.id) {
      syncUserProgress(userProgress);
    }
  }, [appDataloaded, syncUserProgress, user, user.id, userProgress]);

  useEffect(() => {
    if (appDataloaded && user.id) {
      const { selectedCategories, favoriteMeditations, experience } =
        userPreferences;
      syncUserPreferences({
        selectedCategories,
        favoriteMeditations: Object.keys(favoriteMeditations),
        experience,
      });
    }
  }, [appDataloaded, syncUserPreferences, user.id, userPreferences]);

  useEffect(() => {
    if (appDataloaded && user.id) {
      getUserData();
    }
  }, [appDataloaded, getUserData, user.id]);
};
