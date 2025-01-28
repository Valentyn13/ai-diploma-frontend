/* eslint-disable no-catch-shadow */
import config from '@common/config';
import {
  LOGGING_CHANNLE_ERROR_MESSAGE,
  REQUEST_FAILED_ERROR_MESSAGE,
} from '@common/constants';
import * as Sentry from '@sentry/react-native';
import api from '@services/api';
import { logout, setAccessToken, setLoaderFalse } from '@store/actions';
import alert from '@utils/alert';
import logger from '@utils/logger';
import { getToken, storeToken } from '@utils/tokenHolder';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { useClearChatStore } from '../useClearChatStore';
import usePrevious from '../usePrevious';
import { useUser } from '../useUser';
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

  const { data, status } = await httpClient[method](apiUrl, apiParams);
  return { data, status };
};

export const refreshAccessToken = async (
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

export let jwtToken = '';

export default ({
  api: requestApi,
  params = defaultParams,
  deps = [],
  shouldDispatch = () => true,
  showError = true,
}) => {
  const [results, dispatch] = useReducer(responseReducer, initialResponse);
  const { user } = useUser();
  const dispatchAction = useDispatch();
  const { clearChatStore } = useClearChatStore();

  const fetch = useCallback(
    async (fetchParams = undefined) => {
      dispatch({ type: actions.init });

      const { setAuthToken } = requestApi;

      if (setAuthToken) {
        const token = await getToken();
        if (token) {
          jwtToken = token;
          setAuthHeader(token);
        } else {
          console.log('no token');

          dispatch({ type: actions.fail, payload: 'MissingToken' });
          return null;
        }
      }

      const apiParams = fetchParams || params;

      try {
        const { data, status } = await httpRequest(
          requestApi,
          apiParams,
          user.id,
        );

        const { token } = data;

        if (status === 200 || status === 201) {
          if (token && token.accessToken) {
            console.log('setting token');
            setAuthHeader(token.accessToken);
            storeToken(token.accessToken);
          }
          dispatch({ type: actions.success, payload: data });
        } else {
          if (showError) {
            alert(REQUEST_FAILED_ERROR_MESSAGE);
          }
          dispatch({ type: actions.fail, payload: 'unknown' });
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          const message = extractError(error);
          if (message === 'jwt expired') {
            const { accessToken, refreshToken } = await refreshAccessToken(
              user.id,
              user.email,
              user.refreshToken,
            );

            if (accessToken && refreshToken) {
              console.log('setting token');
              storeToken(accessToken);
              dispatchAction(setAccessToken({ accessToken, refreshToken }));
              const res = requestAfterRefresh(requestApi, apiParams, user.id);
              if (res.err) {
                dispatch({ type: actions.fail, payload: res.err });
              }
              dispatch({ type: actions.success, payload: res.data });
            } else {
              dispatchAction(logout());
              clearChatStore();
            }
          } else {
            // TODO: improve it
            if (
              error?.message?.includes('timeout') ||
              error?.message?.includes('500') ||
              error?.message?.includes('404')
            ) {
              Sentry.captureException(error);
            }

            if (showError) {
              if (
                requestApi.url === 'auth/apple' ||
                requestApi.url === 'auth/facebook' ||
                requestApi.url === 'auth/google'
              ) {
                console.error(error);
                alert(LOGGING_CHANNLE_ERROR_MESSAGE);
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
      user.email,
      user.id,
      user.refreshToken,
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
