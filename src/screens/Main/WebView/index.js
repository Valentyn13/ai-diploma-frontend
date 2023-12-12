import { useRoute } from '@react-navigation/native';
import React from 'react';
import { WebView as RNWebView } from 'react-native-webview';

const WebView = () => {
  const route = useRoute();
  const uri = route.params?.uri;
  return <RNWebView source={{ uri }} style={{ flex: 1 }} />;
};

export default WebView;
