import useLogin from '@services/hooks/useLogin';

export const useLoginActions = () => {
  const { loginWithApple, loginWithFacebook } = useLogin();

  const onAppleButtonPress = async () => {
    loginWithApple();
  };

  const onFblogin = () => {
    loginWithFacebook();
  };

  return {
    onAppleButtonPress,
    onFblogin,
  };
};
