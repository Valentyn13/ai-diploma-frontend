import {
  Identify,
  identify,
  setUserId,
  track,
} from '@amplitude/analytics-react-native';
import config from '@common/config';

const isDev = config.isDev;
const identifyObj = new Identify();

export function setAmplitudeUser(userId: string, userEmail: string) {
  if (isDev) {
    return;
  }

  if (userId) {
    const email = userEmail || '';
    const id = userId.toString();

    identifyObj.set('email', email).set('userId', id);

    identify(identifyObj);
    setUserId(id);
  }
}

export function clearAmplitudeUser() {
  if (isDev) {
    return;
  }

  identifyObj.clearAll();
  identify(identifyObj);
}

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
