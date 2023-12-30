import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const FB_PERMISSIONS = ['email', 'public_profile'];

export const fbLogin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await LoginManager.logInWithPermissions(FB_PERMISSIONS);

      if (result.isCancelled) {
        reject({ isCancel: true });
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        reject('Something went wrong obtaining the users access token');
        return;
      }

      resolve(data.accessToken);
    } catch (e) {
      reject(e);
    }
  });
};

export const fbLogout = () => {
  LoginManager.logOut();
};
