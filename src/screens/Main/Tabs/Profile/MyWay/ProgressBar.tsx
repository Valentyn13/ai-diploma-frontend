import Gradient from '@common/components/Gradient';
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
        width: `${Math.min(progress, 100)}%`,
        backgroundColor: '#FFB291',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Gradient colors={['#FFB799', '#A7BFE8', '#6190E8']} angle={45} />
    </View>
  </View>
);

export default ProgressBar;
