import {
  APP_STORE_FALLBACK_URL,
  COUNTRY_CODE,
  PLAY_STORE_FALLBACK_URL,
} from '@common/constants';
import * as Sentry from '@sentry/react-native';
import { getMinAppVersion } from '@services/api/minAppVersion';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import compare from 'semver-compare';

const IOS_APP_ID = 1549517842;

const getAndroidVersion = async () => {
  try {
    const url =
      'https://play.google.com/store/apps/details?id=com.rega.regaapp&hl=en';
    const response = await fetch(url);
    const text = await response.text();

    const match = text.match(/\[\"[0-9]+\.[0-9]+\"\]/g);

    if (match && match.length > 0) {
      const latestVersion = match[0].replace('["', '').replace('"]', '');
      return parseFloat(latestVersion);
    }

    throw new Error('There was some error fetching app store');
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

const getIOSVersion = async () => {
  try {
    const dateNow = new Date().getTime();
    const url = `https://itunes.apple.com/${COUNTRY_CODE}/lookup?bundleId=com.regapp&date=${dateNow}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.resultCount) {
      return json.results[0].version;
    } else {
      throw new Error('There was some error fetching app store');
    }
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

const getVersion = async () => {
  let version = null;

  if (Platform.OS === 'ios') {
    version = await getIOSVersion();
  } else if (Platform.OS === 'android') {
    version = await getAndroidVersion();
  }

  return version ? String(version) : null;
};

const getUpdateUrl = async () => {
  if (Platform.OS === 'ios') {
    return `itms-apps://apps.apple.com/${COUNTRY_CODE}app/id${IOS_APP_ID}`;
  } else if (Platform.OS === 'android') {
    return 'market://details?id=com.rega.regaapp';
  }
};

const getFallbackUrl = () => {
  if (Platform.OS === 'ios') {
    return APP_STORE_FALLBACK_URL;
  } else if (Platform.OS === 'android') {
    return PLAY_STORE_FALLBACK_URL;
  }
};

const shouldUpdate = async () => {
  const version = await getMinAppVersion();
  if (!version || version === 'NaN') {
    return false;
  }
  return compare(version, DeviceInfo.getVersion()) > 0;
};

export { getUpdateUrl, shouldUpdate, getFallbackUrl };
