import React, { FC } from 'react';
import { View } from 'react-native';

const ProgressBar: FC<{ progress: number }> = ({ progress }) => (
  <View
    style={{
      flexDirection: 'row',
      height: 20,
      width: '100%',
      backgroundColor: '#160F29',
      borderRadius: 10,
    }}>
    <View
      style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#FFB291',
        borderRadius: 10,
      }}
    />
  </View>
);

export default ProgressBar;
