import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

// user details are fetched in server

const permissions = ['email', 'public_profile'];

// const getUserDetails = () => {
//   return new Promise((resolve, reject) => {
//     new GraphRequestManager()
//       .addRequest(
//         new GraphRequest('/me?fields=name,email', null, (err, res) => {
//           if (!err) {
//             resolve(res);
//           } else {
//             reject(err);
//           }
//         }),
//       )
//       .start();
//   });
// };

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      LoginManager.logInWithPermissions(permissions).then(result => {
        console.log('<<<<<<<<<result>>>>>>', result);
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(accessToken => {
            console.log('accessToken', accessToken);
            resolve({accessToken});
          });
        } else {
          reject({isCancel: true});
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

// TODO: move to facebookMiddleware so it will be called for each logout action
export const fbLogout = () => {
  LoginManager.logOut();
};
