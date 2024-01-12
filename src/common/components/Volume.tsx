import Slider from '@react-native-community/slider';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

interface Props {
  volume: number;
  setVolume: (value: number) => void;
}

const Volume: FC<Props> = ({ volume, setVolume }) => {
  return (
    <View className="w-full flex items-center justify-center">
      <View className="relative w-2/3 flex items-center justify-center">
        <Text className="absolute -right-8 text-sm font-light w-6">🔇</Text>
        <Text className="absolute -left-8 text-sm font-bold w-6">🔊</Text>
        <Slider
          tapToSeek={true}
          inverted
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={volume}
          onValueChange={value => setVolume(value)}
          minimumTrackTintColor="#273051"
          maximumTrackTintColor="#d1d5db"
        />
      </View>
    </View>
  );
};

export default Volume;
