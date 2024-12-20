import { setAmplitudeUser } from '@utils/amplitude-helpers';
import { setCrashlyticsUser } from '@utils/crashlytics-helpers';
import { setSentryUser } from '@utils/sentry-helpers';

export const initializeThirdParties = async (id: string, email: string) => {
  setAmplitudeUser(id, email);
  setSentryUser(id, email);
  setCrashlyticsUser(id, email);
};
