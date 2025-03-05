import { PermissionsAndroid, Platform } from 'react-native';

export async function requestStoragePermissions() {
  try {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      ];

      if (Platform.Version < 33) {
        // For Android 12 and below, request WRITE_EXTERNAL_STORAGE
        permissions.push(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allGranted = Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        console.log('All permissions granted!');
      } else {
        console.log('Some permissions were denied.');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}
