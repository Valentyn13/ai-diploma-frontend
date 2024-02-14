import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ progress }) => (
  <View
    style={{
      flexDirection: 'row',
      height: 20,
      width: '100%',
      backgroundColor: '#E5E5E5',
      borderRadius: 10,
    }}>
    <View
      style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#513F73',
        borderRadius: 10,
      }}
    />
  </View>
);

export default ProgressBar;
