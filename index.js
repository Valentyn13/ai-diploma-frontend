/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import '@services/localization/i18n';
import { AppRegistry, I18nManager, Text } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

I18nManager.allowRTL(true);

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
