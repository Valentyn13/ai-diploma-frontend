import LottieView from 'lottie-react-native';
import React from 'react';

export default function Animation() {
  return (
    <LottieView
      style={{
        width: '100%',
        height: 400,
      }}
      source={require('./animation2.json')}
      autoPlay
      loop
    />
  );
}
