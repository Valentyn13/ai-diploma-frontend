import React, { FC } from 'react';
import { Text, View } from 'react-native';

const formatTime = (seconds: number) => {
  // @ts-ignore
  const minutes = parseInt(seconds / 60, 10);

  // @ts-ignore
  const remainingSeconds = parseInt(seconds % 60, 10);

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
};

const TimesLabel: FC<{
  position: number;
  duration: number;
}> = ({ position, duration }) => (
  <View className="flex flex-row justify-between items-center mt-5">
    <Text className="text-xs font-light text-white">
      {formatTime(duration)}
    </Text>
    <Text className="text-xs font-light text-white">
      {formatTime(position)}
      {' / '}
    </Text>
  </View>
);

export default TimesLabel;
