import { appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

export const applelogin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const { email, email_verified, sub } = jwt_decode(
    appleAuthRequestResponse.identityToken,
  );

  const { identityToken, fullName } = appleAuthRequestResponse;
  const givenName = (fullName && fullName.givenName) || 'new user';
  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    return { identityToken, email, email_verified, sub, givenName };
  }
};

export const applelogout = async () => {
  try {
    await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
