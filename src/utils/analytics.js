import analytics from '@react-native-firebase/analytics';

const ENABLED = true;

// eslint-disable-next-line import/prefer-default-export
export const logEvent = (...args) => {
  if (ENABLED) {
    analytics().logEvent(...args);
  }
};
