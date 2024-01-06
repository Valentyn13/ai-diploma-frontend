import LottieView from 'lottie-react-native';
import React from 'react';

export default function NotFound() {
  return (
    <LottieView
      style={{
        width: '100%',
        height: '100%',
      }}
      source={require('./not-found.json')}
      autoPlay
      loop
    />
  );
}
