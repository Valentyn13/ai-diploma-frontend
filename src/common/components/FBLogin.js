import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-native';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { login, logout } from 'store/actions';
import styled from 'styled-components';

/**
 *
 * CURRENTLY NOT IN USE
 *
 */

const FBLoginButton = styled(LoginButton)`
  align-self: stretch;
  margin-top: 20px;
  height: 30px;
`;

// may be used to get additional user details
// const getUserDetails = () => {
//   const req = new GraphRequest('/me?fields=name,email', null, (err, res) => {
//     console.log({err, res});
//   });

//   console.log('requesting user details...');
//   new GraphRequestManager().addRequest(req).start();
// };

const FBLogin = ({ onLogin = undefined, onLogout = undefined }) => {
  const dispatch = useDispatch();
  return (
    <FBLoginButton
      onLoginFinished={(error, result) => {
        console.log('FB Login', { result });
        if (!error && !result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(({ accessToken }) => {
            dispatch(login({ accessToken }));
            if (onLogin) {
              onLogin();
            }
          });
        } else if (error) {
          Alert.alert('failed to login to facebook', result.error);
        }
      }}
      onLogoutFinished={() => {
        dispatch(logout());
        if (onLogout) {
          onLogout();
        }
      }}
    />
  );
};

FBLogin.propTypes = {
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

FBLogin.defaultProps = {
  onLogin: undefined,
  onLogout: undefined,
};

export default FBLogin;
