import React from 'react';
import {WebView as RNWebView} from 'react-native-webview';
import {useNavigationParam} from 'react-navigation-hooks';

const WebView = () => {
  const uri = useNavigationParam('uri');
  return <RNWebView source={{uri}} style={{flex: 1}} />;
};

export default WebView;
