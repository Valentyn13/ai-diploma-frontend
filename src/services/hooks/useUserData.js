import api from '@services/api';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from 'store/actions';

import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();

  const profileApi = useAxios({
    api: api.profile,
    shouldDispatch: () => false,
  });

  const { fetch: fetchProfile } = profileApi;

  const getUserData = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  const { completed, data } = profileApi;

  useEffect(() => {
    if (completed && data) {
      dispatch(setUserData(data));
    }
  }, [dispatch, completed, data]);

  return {
    getUserData,
  };
};
