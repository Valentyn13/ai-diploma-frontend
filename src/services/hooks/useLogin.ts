import {
  ERROR_MESSAGES,
  INCORRECT_PASSWORD,
  LOGIN_ALERT_TITLE,
  LOGIN_DEFAULT_ERROR_MESSAGE,
  NON_EXISTING_USER,
  USER_EXIST_WITH_THIS_EMAIL_ERROR_MESSAGE,
} from '@common/constants';
import api from '@services/api';
import { login, setLoder } from '@store/actions';
import { useLoginStore } from '@store/useLoginStore';
import { handleSentryException } from '@utils/sentry-helpers';
import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import useAxios from './useAxios';
import { useUser } from './useUser';

export default () => {
  const { setIsLoading } = useLoginStore(state => state);
  const dispatch = useDispatch();
  const { user } = useUser();
  const preferences = useSelector(state => state.userPreferences);

  const handleError = useCallback(
    (error: string) => {
      if (typeof error !== 'string') {
        Alert.alert(LOGIN_ALERT_TITLE, LOGIN_DEFAULT_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }

      switch (error.trim()) {
        case ERROR_MESSAGES.DUPLICATE_EMAIL:
          Alert.alert(
            LOGIN_ALERT_TITLE,
            USER_EXIST_WITH_THIS_EMAIL_ERROR_MESSAGE,
          );
          break;
        case ERROR_MESSAGES.INCORRECT_PASSWORD:
          Alert.alert(LOGIN_ALERT_TITLE, INCORRECT_PASSWORD);
          break;
        case ERROR_MESSAGES.NON_EXISTING_USER:
          Alert.alert(LOGIN_ALERT_TITLE, NON_EXISTING_USER);
          break;
        default:
          Alert.alert(LOGIN_ALERT_TITLE, LOGIN_DEFAULT_ERROR_MESSAGE);
          break;
      }
      setIsLoading(false);
    },
    [setIsLoading],
  );

  const emailLogin = useAxios({
    api: api.login,
    setToken: true,
    shouldDispatch: () => false,
  });

  const register = useAxios({
    api: api.register,
    setToken: true,
    shouldDispatch: () => false,
  });

  const forgotPasswordApi = useAxios({
    api: api.forgotPassword,
    setToken: true,
    shouldDispatch: () => false,
  });

  const resetPasswordApi = useAxios({
    api: api.resetPassword,
    setToken: true,
    shouldDispatch: () => false,
  });

  const loginWithEmail = (email, password, fcmToken) => {
    const { fetch } = emailLogin;
    return fetch({ email, password, fcmToken });
  };

  const signUp = (email, password, name, fcmToken) => {
    dispatch(setLoder());
    const { fetch } = register;
    const { sex } = user;
    const { selectedCategories } = preferences;

    fetch({
      email,
      password,
      name,
      sex: sex || 'M',
      categories: selectedCategories || [],
      fcmToken,
    });
  };

  const forgotPassword = (email: string) => {
    const { fetch } = forgotPasswordApi;
    return fetch({ email });
  };
  const {
    completed: resetPasswordCompleted,
    error: resetPasswordError,
    fetch: resetPasswordFetch,
  } = resetPasswordApi;

  const resetPassword = async (
    email: string,
    password: string,
    resetToken: string,
  ) => {
    await resetPasswordFetch({ email, password, resetToken });
  };

  const dispatchLogin = useCallback(
    data => {
      const {
        user: {
          id,
          name,
          email,
          sex,
          userPreferences,
          userProgress,
          isNotification,
          notificationTime,
        },
        token: { refreshToken, accessToken },
      } = data;

      dispatch(
        login({
          id,
          name,
          email,
          sex,
          userPreferences,
          userProgress,
          accessToken,
          refreshToken,
          isNotification,
          notificationTime,
        }),
      );
    },
    [dispatch],
  );

  // email login
  const {
    completed: emailLoginCompleted,
    data: emailLoginData,
    error: emailError,
  } = emailLogin;

  useEffect(() => {
    if (emailLoginCompleted) {
      if (emailLoginData?.user) {
        dispatchLogin(emailLoginData);
      } else {
        handleSentryException({
          src: 'Login Screen',
          error: new Error(
            'Missing Email Login Data' + ' | ' + JSON.stringify(emailLoginData),
          ),
        });
      }
    }
  }, [emailLoginData, emailLoginCompleted, dispatchLogin]);

  const {
    completed: registerCompleted,
    data: registerData,
    error: registerError,
  } = register;

  useEffect(() => {
    if (registerCompleted) {
      if (registerData?.user) {
        dispatchLogin(registerData);
      } else {
        handleSentryException({
          src: 'Login Screen',
          error: new Error(
            'Missing Register Data' + ' | ' + JSON.stringify(registerData),
          ),
        });
      }
    }
  }, [registerCompleted, registerData, dispatchLogin]);

  useEffect(() => {
    const possibleError = emailError || registerError;
    if (possibleError) {
      handleError(possibleError);
    }
  }, [emailError, registerError, handleError]);

  return {
    loginWithEmail,
    signUp,
    resetPassword,
    resetPasswordCompleted,
    resetPasswordError,
    forgotPassword,
  };
};
