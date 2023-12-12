import api from '@services/api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useAxios from './useAxios';
import useUserData from './useUserData';

export default () => {
  const appDataloaded = useSelector(state => state.appData.loaded);
  const userDetails = useSelector(state => state.userDetails);
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
    if (appDataloaded && userDetails.id) {
      syncUserProgress(userProgress);
    }
  }, [
    appDataloaded,
    syncUserProgress,
    userDetails,
    userDetails.id,
    userProgress,
  ]);

  useEffect(() => {
    if (appDataloaded && userDetails.id) {
      const { selectedCategories, favoriteMeditations, experience } =
        userPreferences;
      syncUserPreferences({
        selectedCategories,
        favoriteMeditations: Object.keys(favoriteMeditations),
        experience,
      });
    }
  }, [appDataloaded, syncUserPreferences, userDetails.id, userPreferences]);

  useEffect(() => {
    if (appDataloaded && userDetails.id) {
      getUserData();
    }
  }, [appDataloaded, getUserData, userDetails.id]);
};
