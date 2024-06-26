import messaging from '@react-native-firebase/messaging';
import '@services/localization/i18n';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import App from './App';
import './ComponentConfig.js';
import './FoundationConfig.js';
import { name as appName } from './app.json';
import { PlaybackService } from './service';

// import './src/ReactotronConfig.js';

messaging().setBackgroundMessageHandler(async remoteMessage => {});

TrackPlayer.registerPlaybackService(() => PlaybackService);

AppRegistry.registerComponent(appName, () => App);
