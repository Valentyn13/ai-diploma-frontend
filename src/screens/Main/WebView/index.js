import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';

const renderLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const WebView = () => {
  const route = useRoute();
  const uri = route.params?.uri;

  return (
    <View className="flex-1">
      <RNWebView
        startInLoadingState={true}
        source={{ uri }}
        onError={e => {console.log(e)}}
        onHttpError={e => {console.log(e)}}
        cacheEnabled={false}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebView;
