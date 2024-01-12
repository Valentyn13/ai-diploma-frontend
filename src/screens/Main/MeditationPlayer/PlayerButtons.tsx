import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome6';

import PlayPauseButton from './PlayPauseButton';

const PlayerControls: React.FC = () => {
  const { state } = usePlaybackState();

  const togglePlay = async () => {
    if (state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  return (
    <View className="relative flex flex-row justify-between mt-2 items-center w-8/12">
      <TouchableOpacity className="p-4" onPress={() => TrackPlayer.seekBy(15)}>
        <Icon color="#fff" name="rotate-right" size={30} />
      </TouchableOpacity>
      <PlayPauseButton
        isPlaying={state === State.Playing}
        onBtnPress={togglePlay}
      />
      <TouchableOpacity className="p-4" onPress={() => TrackPlayer.seekBy(-15)}>
        {/* <Text className="absolute top-0 left-0 text-white text-sm">15</Text> */}
        <Icon
          // style={{
          //   transform: [{ rotate: '180deg' }],
          // }}
          color="#fff"
          name="rotate-left"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;
