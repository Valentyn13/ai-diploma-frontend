import config from '@common/config';
import * as Sentry from '@sentry/react-native';
import { useEffect } from 'react';

const SENTRY_DSN =
  'https://5a917437add5f5db03979e732124c433@o4506552352702464.ingest.sentry.io/4506552357421056';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  enabled: !config.isDev,
  _experiments: {
    replaysSessionSampleRate: config.isDev ? 0 : 0.75,
    replaysOnErrorSampleRate: config.isDev ? 0 : 0.75,
  },
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: false,
      maskAllVectors: false,
    }),
  ],
});

const useSentry = () => {
  useEffect(() => {
    return () => {
      Sentry.close();
    };
  }, []);
};

export default useSentry;
