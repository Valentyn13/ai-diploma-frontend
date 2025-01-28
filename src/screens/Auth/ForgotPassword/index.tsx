import {
  PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE,
  RESET_PASSWORD_ERROR_MESSAGE,
} from '@common/constants';
import useLogin from '@services/hooks/useLogin';
import alert from '@utils/alert';
import React, { FC, useEffect, useState } from 'react';

import RequestReset from './RequestReset';
import ResetPassword from './ResetPassword';

const ForgotPassword: FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const {
    forgotPassword,
    resetPassword,
    resetPasswordError,
    resetPasswordCompleted,
  } = useLogin();

  useEffect(() => {
    if (!resetPasswordCompleted) {
      return;
    }
    if (resetPasswordError) {
      alert(RESET_PASSWORD_ERROR_MESSAGE);
      return;
    }

    alert(PASSWORD_CHANGED_SUCCESSFULLY_MESSAGE);
    navigation.navigate('Auth', { screen: 'Login' });
  }, [resetPasswordError, resetPasswordCompleted, navigation]);

  const onSendCode = async (toEmail: string) => {
    await forgotPassword(toEmail);
    setEmail(toEmail);
    setCodeSent(true);
  };

  const onSubmit = async (newPassword: string, code: string) => {
    resetPassword(email, newPassword, code);
  };

  if (!codeSent) {
    return <RequestReset onSendCode={onSendCode} navigation={navigation} />;
  }

  return <ResetPassword onSubmit={onSubmit} navigation={navigation} />;
};

export default ForgotPassword;
