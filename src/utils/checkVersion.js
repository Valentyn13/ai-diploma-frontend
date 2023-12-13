import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import compare from 'semver-compare';

const getAndroidDetails = async () => {
  const storeUrl =
    'https://play.google.com/store/apps/details?id=com.rega.regaapp&hl=en';
  const res = await fetch(storeUrl)
    .then(res => res.text())
    .then(text => {
      const match = text.match(/\[\"[0-9]+\.[0-9]+\"\]/g);
      if (match && match.length > 0) {
        const latestVersion = match[0].replace('["', '').replace('"]', '');

        return {
          latestVersion: parseFloat(latestVersion),
          storeUrl,
          currentVersion: parseFloat(DeviceInfo.getVersion()),
          isNeeded:
            compare(latestVersion, DeviceInfo.getVersion()) > 0 ? true : false,
        };
      }

      return { error: 'There was some error fetching play store' };
    });
  return res;
};

const getiOSDetails = async country => {
  const countryCode = country ? `${country}/` : 'us/';
  const dateNow = new Date().getTime();

  return fetch(
    `https://itunes.apple.com/${countryCode}lookup?bundleId=com.regapp&date=${dateNow}`,
  )
    .then(res => res.json())
    .then(json => {
      if (json.resultCount) {
        const version = json.results[0].version;
        const appId = json.results[0].trackId;
        const storeUrl = `itms-apps://apps.apple.com/${countryCode}app/id${appId}`;
        return {
          latestVersion: version,
          appId,
          storeUrl,
          currentVersion: DeviceInfo.getVersion(),
          isNeeded:
            compare(version, DeviceInfo.getVersion()) > 0 ? true : false,
        };
      }
      return {
        error: 'No info about this app.',
      };
    });
};

const checkVersion = async () => {
  if (Platform.OS === 'ios') {
    return getiOSDetails();
  } else if (Platform.OS === 'android') {
    return getAndroidDetails();
  }
};

export { checkVersion };
