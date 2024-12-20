import config from '@common/config';
import * as Sentry from '@sentry/react-native';

interface HandleSentryExceptionArgs {
  src: string;
  error: Error;
}

const isDev = config.isDev;

export const handleSentryException = ({
  src,
  error,
}: HandleSentryExceptionArgs) => {
  const err = error?.message || 'Unexpected Error!';
  const errorMessage = `[Source]: ${src} | [Error]: ${err}`;
  const newError = new Error(errorMessage);

  if (isDev) {
    console.log(errorMessage);
  } else {
    Sentry.captureException(newError);
  }
};

export const setSentryUser = (id: string, email: string) => {
  if (isDev) {
    return;
  }

  if (id) {
    Sentry.setTag('user_id', id);
    Sentry.setTag('user_email', email);
    Sentry.setUser({ id });
  }
};

export const clearSentryUser = () => {
  if (isDev) {
    return;
  }

  Sentry.setUser(null);
  Sentry.setTag('user_id', undefined);
  Sentry.setTag('user_email', undefined);
};
