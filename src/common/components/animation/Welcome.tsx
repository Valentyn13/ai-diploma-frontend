import LottieView from 'lottie-react-native';
import React from 'react';

export default function Welcome() {
  return (
    <LottieView
      style={{
        width: '100%',
        height: '100%',
      }}
      source={require('./welcome.json')}
      autoPlay
      loop
    />
  );
}
