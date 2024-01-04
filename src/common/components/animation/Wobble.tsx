import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function Wobble() {
  return (
    <LottieView
      style={{
        width: DEVICE_WIDTH * 2,
        height: 600,
      }}
      speed={0.4}
      source={require('./wobble.json')}
      autoPlay
      loop
    />
  );
}
