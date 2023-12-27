import LottieView from 'lottie-react-native';
import React from 'react';

export default function Meditate() {
  return (
    <LottieView
      style={{
        width: '100%',
        height: '100%',
      }}
      source={require('./meditate.json')}
      autoPlay
      loop
    />
  );
}
