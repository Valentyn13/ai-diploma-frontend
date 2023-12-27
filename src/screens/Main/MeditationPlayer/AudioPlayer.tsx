import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';

interface Props {
  id: string;
  url: string;
  title: string;
  artist: string;
}

const AudioPlayer: FC<Props> = ({ id, url, title, artist }) => {
  useEffect(() => {
    const addTrack = async () => {
      await TrackPlayer.add({
        id,
        url,
        title,
        artist,
        artwork: require('../../../common/assets/images/bgs/work2.jpg'),
      });

      TrackPlayer.play();
    };

    addTrack();

    return () => {
      TrackPlayer.reset();
    };
  }, [artist, id, title, url]);

  const progress = useProgress();

  return (
    <View>
      <Text>{progress.position}</Text>
      {/* <ProgressBar progress={progress.position} buffered={progress.buffered} /> */}
    </View>
  );
};

export default AudioPlayer;
