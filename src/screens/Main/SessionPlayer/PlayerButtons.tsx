import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome6';

import PlayPauseButton from './PlayPauseButton';

const PlayerControls: FC = () => {
  const { playing } = useIsPlaying();

  const togglePlay = useCallback(() => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }, [playing]);

  return (
    <View className="relative flex flex-row justify-between mt-2 items-center w-8/12">
      <TouchableOpacity
        className="p-4 z-10"
        onPress={() => TrackPlayer.seekBy(15)}>
        <Icon color="#fff" name="rotate-right" size={30} />
      </TouchableOpacity>
      <PlayPauseButton isPlaying={!!playing} onBtnPress={togglePlay} />
      <TouchableOpacity
        className="p-4 z-10"
        onPress={() => TrackPlayer.seekBy(-15)}>
        <Icon color="#fff" name="rotate-left" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;
