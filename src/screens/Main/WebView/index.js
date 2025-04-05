import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';

const WebView = () => {
  const route = useRoute();
  const uri = route.params?.uri;


  const handleShouldStartLoad = event => {
    // Check if the URL contains the viewer URL, and allow or block as needed
    console.log('Loading URL:', event.url);
    return true; // Returning true will allow the WebView to load the URL
  };

  return (
    <View className="flex-1">
      <RNWebView
        originWhitelist={['*']}
        startInLoadingState={true}
        source={{ uri }}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        cacheEnabled={false}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebView;
