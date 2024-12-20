import config from '@common/config';
import crashlytics from '@react-native-firebase/crashlytics';

const isDev = config.isDev;

export async function setCrashlyticsUser(userId: string, userEmail: string) {
  if (isDev) {
    return;
  }

  if (userId) {
    const email = userEmail || '';
    const id = userId.toString();

    await Promise.all([
      crashlytics().setUserId(id),
      crashlytics().setAttributes({
        email,
        username: email,
      }),
    ]);
  }
}
