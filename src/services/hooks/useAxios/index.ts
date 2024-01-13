/* eslint-disable no-catch-shadow */
import config from '@common/config';
import * as Sentry from '@sentry/react-native';
import api from '@services/api';
import { logout, setAccessToken, setLoaderFalse } from '@store/actions';
import alert from '@utils/alert';
import logger from '@utils/logger';
import { getToken, storeToken } from '@utils/tokenHolder';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usePrevious from '../usePrevious';
import { actions, initialResponse, responseReducer } from './reducers';

const defaultParams = {};

const httpClient = axios.create({
  headers: {
    'content-type': 'application/json',
  },
  baseURL: config.baseURL,
});

const setAuthHeader = token => {
  httpClient.defaults.headers.Authorization = `Bearer ${token}`;
};

const extractError = error => {
  const { response } = error;
  if (response && response.data) {
    if (response.data.errors && Array.isArray(response.data.errors)) {
      return response.data.errors.reduce((allErrs, err) => {
        if (err.messages && Array.isArray(err.messages)) {
          return `${allErrs} ${err.messages[0]}`;
        }
        return `${allErrs} unknown error`;
      }, '');
    }
    if (response.data.message) {
      return response.data.message;
    }
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
  }

  if (error.message) {
    return error.message;
  }
  return 'unknown';
};

const httpRequest = async ({ method, url }, apiParams, userId) => {
  const apiUrl = url.replace(':userId', userId);

  console.log('apiUrl', `${config.baseURL}${apiUrl}`);
  const { data, status } = await httpClient[method](apiUrl, apiParams);
  return { data, status };
};

const refreshAccessToken = async (
  id: string,
  email: string,
  refreshToken: string,
) => {
  if (email && refreshToken) {
    try {
      const { data } = await httpRequest(
        api.refreshToken,
        {
          email,
          refreshToken,
        },
        id,
      );
      return data;
    } catch (error) {
      const err = extractError(error);
      logger.log('failed to refresh token', err);
    }
  } else {
    logger.log('missing refreshToken params');
  }
  return {};
};

const requestAfterRefresh = async (requestApi, apiParams, id) => {
  try {
    const { data, status } = await httpRequest(requestApi, apiParams, id);
    return { data, status };
  } catch (error) {
    return { error };
  }
};

export default ({
  api: requestApi,
  params = defaultParams,
  deps = [],
  shouldDispatch = () => true,
  showError = true,
}) => {
  const [results, dispatch] = useReducer(responseReducer, initialResponse);
  const userDetails = useSelector(state => state.userDetails);
  const dispatchAction = useDispatch();

  const fetch = useCallback(
    async (fetchParams = undefined) => {
      dispatch({ type: actions.init });

      const { setAuthToken } = requestApi;

      console.log('step 1');
      if (setAuthToken) {
        const token = await getToken();
        if (token) {
          setAuthHeader(token);
        } else {
          console.log('no token');

          dispatch({ type: actions.fail, payload: 'MissingToken' });
          return null;
        }
      }

      console.log('step 2');

      const apiParams = fetchParams || params;

      try {
        const { data, status } = await httpRequest(
          requestApi,
          apiParams,
          userDetails.id,
        );

        console.log('step 3');

        const { token } = data;

        if (status === 200 || status === 201) {
          if (token && token.accessToken) {
            setAuthHeader(token.accessToken);
            storeToken(token.accessToken);
          }
          dispatch({ type: actions.success, payload: data });
        } else {
          if (showError) {
            alert('request failed');
          }
          dispatch({ type: actions.fail, payload: 'unknown' });
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          const message = extractError(error);
          if (message === 'jwt expired') {
            const { accessToken, refreshToken } = await refreshAccessToken(
              userDetails.id,
              userDetails.email,
              userDetails.refreshToken,
            );

            if (accessToken && refreshToken) {
              storeToken(accessToken);
              dispatchAction(setAccessToken({ accessToken, refreshToken }));
              const res = requestAfterRefresh(
                requestApi,
                apiParams,
                userDetails.id,
              );
              if (res.err) {
                dispatch({ type: actions.fail, payload: res.err });
              }
              dispatch({ type: actions.success, payload: res.data });
            } else {
              dispatchAction(logout());
            }
          } else {
            Sentry.captureException(error);
            if (showError) {
              if (
                requestApi.url === 'auth/apple' ||
                requestApi.url === 'auth/facebook' ||
                requestApi.url === 'auth/google'
              ) {
                console.error(error);
                alert(
                  'היי אנחנו חווים תקלה בהתחברות דרך ערוץ זה, אנא נסו שנית או בחרו ערוץ התחברות אחר',
                );
                dispatchAction(setLoaderFalse());
              } else {
                if (
                  requestApi.url === 'auth/register' ||
                  requestApi.url === 'auth/login'
                ) {
                  dispatchAction(setLoaderFalse());
                }
                // alert(message);

                dispatch({ type: actions.fail, payload: message });
              }
            }
          }
        } else {
          dispatch({ type: actions.fail, payload: 'request cancelled' });
        }
      }

      return () => {
        // source.cancel();
      };
    },
    [
      dispatchAction,
      params,
      requestApi,
      showError,
      userDetails.email,
      userDetails.id,
      userDetails.refreshToken,
    ],
  );

  useEffect(() => {
    if (shouldDispatch()) {
      fetch();
    }
  }, [fetch, shouldDispatch, deps]);

  const { loading, error } = results;
  const prevLoading = !!usePrevious(loading);
  const completed = prevLoading && !loading && !error;

  return useMemo(
    () => ({
      completed,
      fetch,
      ...results,
    }),
    [completed, fetch, results],
  );
};
