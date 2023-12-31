import { captureMessage } from '@sentry/react-native';
import api from '@services/api';
import { applelogin } from '@utils/apple';
import { fbLogin } from '@utils/facebook';
import logger from '@utils/logger';
import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoder } from 'store/actions';

import { getFcmToken } from '../../helper/pushNotifications';
import useAxios from './useAxios';

export default () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const preferences = useSelector(state => state.userPreferences);

  const emailLogin = useAxios({
    api: api.login,
    setToken: true,
    shouldDispatch: () => false,
  });

  const facebookLogin = useAxios({
    api: api.facebook,
    setToken: true,
    shouldDispatch: () => false,
  });

  const appleLoginApi = useAxios({
    api: api.apple,
    setToken: true,
    shouldDispatch: () => false,
  });

  const register = useAxios({
    api: api.register,
    setToken: true,
    shouldDispatch: () => false,
  });

  const loginWithEmail = (email, password, fcmToken) => {
    const { fetch } = emailLogin;
    return fetch({ email, password, fcmToken });
  };

  const loginWithFacebook = async () => {
    const fcmToken = await getFcmToken();

    try {
      const accessToken = await fbLogin();
      const { fetch } = facebookLogin;
      const { sex } = userDetails;
      const { selectedCategories } = preferences;

      fetch({
        access_token: accessToken,
        sex,
        categories: selectedCategories,
        fcmToken,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const loginWithApple = async () => {
    const fcmToken = await getFcmToken();
    const res = await applelogin();
    const { fetch } = appleLoginApi;

    const { sex } = userDetails;
    const { selectedCategories } = preferences;

    fetch({
      access_token: res.identityToken,
      sex,
      categories: selectedCategories,
      email: res.email,
      sub: res.sub,
      name: res.givenName,
      fcmToken,
    });
  };

  const signUp = (email, password, name, fcmToken) => {
    dispatch(setLoder());
    const { fetch } = register;
    const { sex } = userDetails;
    const { selectedCategories } = preferences;

    fetch({
      email,
      password,
      name,
      sex,
      categories: selectedCategories,
      fcmToken,
    });
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
      // console.log('XXXXXuserXXXXX', userProgress);
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
      if (emailLoginData) {
        dispatchLogin(emailLoginData);
      } else {
        captureMessage('Missing Email Login Data');
      }
    } else if (emailError) {
      Alert.alert(emailError);
    }
  }, [emailLoginData, emailLoginCompleted, dispatchLogin, emailError]);

  const { completed: fbLoginCompleted, data: fbLoginData } = facebookLogin;

  useEffect(() => {
    if (fbLoginCompleted) {
      if (fbLoginData) {
        dispatchLogin(fbLoginData);
      } else {
        captureMessage('Missing FB Login Data');
      }
    }
  }, [fbLoginCompleted, fbLoginData, dispatchLogin]);

  // appleLoin
  const { completed: appleLoginCompleted, data: appleLoginData } =
    appleLoginApi;

  useEffect(() => {
    if (appleLoginCompleted) {
      if (appleLoginData) {
        dispatchLogin(appleLoginData);
      } else {
        captureMessage('Missing Apple Login Data');
      }
    }
  }, [appleLoginCompleted, appleLoginData, dispatchLogin]);
  // register

  const { completed: registerCompleted, data: registerData } = register;

  useEffect(() => {
    if (registerCompleted) {
      if (registerData) {
        dispatchLogin(registerData);
      } else {
        captureMessage('Missing Regsiter Data');
      }
    }
  }, [registerCompleted, registerData, dispatchLogin]);

  return {
    loginWithEmail,
    loginWithFacebook,
    signUp,
    loginWithApple,
  };
};
