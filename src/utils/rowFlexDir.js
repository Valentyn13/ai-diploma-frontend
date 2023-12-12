import {Platform} from 'react-native';

export default Platform.select({
  ios: 'row',
  android: 'row-reverse',
});
