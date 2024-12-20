import {
  Identify,
  identify,
  setUserId,
  track,
} from '@amplitude/analytics-react-native';
import config from '@common/config';

const isDev = config.isDev;
const identifyObj = new Identify();

// export function setAmplitudeUser() {
//   if (isDev) {
//     return;
//   }
//
//   const { user } = useUser();
//
//   if (user?.id) {
//     const email = user.email ? user.email : '';
//
//     identifyObj
//       .set('email', email)
//       .set('phoneNumber', user.phoneNumber)
//       .set('userId', user.id.toString());
//
//     const userId = user.id.toString();
//
//     identify(identifyObj);
//     setUserId(userId);
//   }
// }

// export function clearAmplitudeUser() {
//   if (isDev) {
//     return;
//   }
//
//   identifyObj.clearAll();
//   identify(identifyObj);
// }

export function logAmplitudeEvent(name: string, props = {}) {
  // if (!name || name === 'undefined') {
  //   handleSentryException({
  //     src: 'Amplitude Logger',
  //     error: new Error('Amplitude event name is not provided')
  //   });
  //   return;
  // }

  if (isDev) {
    if (Object.keys(props).length !== 0) {
      console.log('[Amplitude] ' + name + ' | ' + JSON.stringify(props));
    } else {
      console.log('[Amplitude] ' + name);
    }
  } else {
    track(name, props);
  }
}
