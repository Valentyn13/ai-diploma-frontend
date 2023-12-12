import * as Sentry from '@sentry/react-native';

const captureMessage = message => {
  Sentry.captureMessage(message);
};

export default captureMessage;
