import { captureException } from '@sentry/react-native';
import api from '@services/api';
import { setAppData } from '@store/actions';
import captureMessage from '@utils/captureMessage';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();

  const meditations = useAxios({
    api: api.meditations,
    shouldDispatch: () => false,
  });

  const { fetch: fetchMeditations } = meditations;

  const getAppData = useCallback(() => {
    fetchMeditations();
  }, [fetchMeditations]);

  const { completed, data, error } = meditations;

  useEffect(() => {
    if (completed) {
      if (data) {
        dispatch(setAppData(data));
      } else {
        // TODO: add error message
        try {
          const errMsg = error ? error.toString() : '';
          captureMessage(`missing app data ${errMsg}`);
        } catch (e) {
          captureException(e);
        }
      }
    }
  }, [dispatch, completed, data, error]);

  return {
    getAppData,
  };
};
