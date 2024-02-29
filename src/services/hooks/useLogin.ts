import { captureMessage } from '@sentry/react-native';
import api from '@services/api';
import { login, setLoder } from '@store/actions';
import { useLoginStore } from '@store/useLoginStore';
import { applelogin } from '@utils/apple';
import { fbLogin } from '@utils/facebook';
import { googleSignIn } from '@utils/google';
import logger from '@utils/logger';
import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getFcmToken } from '../../helper/pushNotifications';
import useAxios from './useAxios';
import { useUser } from './useUser';

export default () => {
  const { setIsLoading } = useLoginStore(state => state);
  const dispatch = useDispatch();
  const { user } = useUser();
  const preferences = useSelector(state => state.userPreferences);

  const handleError = () => {
    Alert.alert('שגיאה בהתחברות', 'אנא נסה שנית דרך ערוץ אחר');
    setIsLoading(false);
  };

  const emailLogin = useAxios({
    api: api.login,
    setToken: true,
    shouldDispatch: () => false,
  });

  const facebookLoginApi = useAxios({
    api: api.facebook,
    setToken: true,
    shouldDispatch: () => false,
  });

  const googleLoginApi = useAxios({
    api: api.google,
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

  const loginWithGoogle = async () => {
    try {
      const fcmToken = await getFcmToken();
      const res = await googleSignIn();

      const { fetch } = googleLoginApi;
      const { sex } = user;
      const { selectedCategories } = preferences;

      await fetch({
        access_token: res.idToken,
        name: res.user.givenName,
        email: res.user.email,
        sub: res.user.id,
        sex,
        categories: selectedCategories,
        fcmToken,
      });
    } catch (error) {
      logger.error(error);
      handleError();
    }
  };

  const loginWithFacebook = async () => {
    const fcmToken = await getFcmToken();

    try {
      const accessToken = await fbLogin();
      const { fetch } = facebookLoginApi;
      const { sex } = user;
      const { selectedCategories } = preferences;

      fetch({
        access_token: accessToken,
        sex,
        categories: selectedCategories,
        fcmToken,
      });
    } catch (error) {
      logger.error(error);
      handleError();
    }
  };

  const loginWithApple = async () => {
    const fcmToken = await getFcmToken();

    try {
      const res = await applelogin();
      const { fetch } = appleLoginApi;

      const { sex } = user;
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
    } catch (error) {
      logger.error(error);
      handleError();
    }
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
      if (emailLoginData) {
        dispatchLogin(emailLoginData);
      } else {
        captureMessage('Missing Email Login Data');
      }
    }
  }, [emailLoginData, emailLoginCompleted, dispatchLogin]);

  const {
    completed: fbLoginCompleted,
    data: fbLoginData,
    error: fbError,
  } = facebookLoginApi;

  useEffect(() => {
    if (fbLoginCompleted) {
      if (fbLoginData) {
        dispatchLogin(fbLoginData);
      } else {
        captureMessage('Missing FB Login Data');
      }
    }
  }, [fbLoginCompleted, fbLoginData, dispatchLogin]);

  const {
    completed: googleLoginCompleted,
    data: googleLoginData,
    error: googleError,
  } = googleLoginApi;

  useEffect(() => {
    if (googleLoginCompleted) {
      if (googleLoginData) {
        dispatchLogin(googleLoginData);
      } else {
        captureMessage('Missing Google Login Data');
      }
    }
  }, [dispatchLogin, googleLoginCompleted, googleLoginData]);

  // appleLoin
  const {
    completed: appleLoginCompleted,
    data: appleLoginData,
    error: appleError,
  } = appleLoginApi;

  useEffect(() => {
    if (appleLoginCompleted) {
      if (appleLoginData) {
        dispatchLogin(appleLoginData);
      } else {
        captureMessage('Missing Apple Login Data');
      }
    }
  }, [appleLoginCompleted, appleLoginData, dispatchLogin]);

  const {
    completed: registerCompleted,
    data: registerData,
    error: registerError,
  } = register;

  useEffect(() => {
    if (registerCompleted) {
      if (registerData) {
        dispatchLogin(registerData);
      } else {
        captureMessage('Missing Regsiter Data');
      }
    }
  }, [registerCompleted, registerData, dispatchLogin]);

  useEffect(() => {
    if (emailError || fbError || googleError || appleError || registerError) {
      handleError();
    }
  }, [
    emailError,
    fbError,
    googleError,
    appleError,
    registerError,
    setIsLoading,
    handleError,
  ]);

  return {
    loginWithEmail,
    loginWithFacebook,
    loginWithGoogle,
    signUp,
    resetPassword,
    resetPasswordCompleted,
    resetPasswordError,
    forgotPassword,
    loginWithApple,
  };
};
