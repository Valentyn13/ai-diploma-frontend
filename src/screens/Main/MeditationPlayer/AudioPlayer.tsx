import { getCategoryImgName } from '@common/assets/images';
import { BGS_ASSETS_URL } from '@common/constants';
import React, { FC, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';

interface Props {
  id: string;
  url: string;
  title: string;
  artist: string;
  thumbnail: string;
  categoryName: string;
}

const AudioPlayer: FC<Props> = ({
  id,
  url,
  title,
  artist,
  thumbnail,
  categoryName,
}) => {
  const pathName = useMemo(
    () => getCategoryImgName(categoryName, 0, thumbnail),
    [categoryName, thumbnail],
  );

  useEffect(() => {
    const addTrack = async () => {
      await TrackPlayer.add({
        id,
        url,
        title,
        artist,
        artwork: `${BGS_ASSETS_URL}${pathName}`,
      });

      TrackPlayer.play();
    };

    addTrack();

    return () => {
      TrackPlayer.reset();
    };
  }, [artist, id, pathName, title, url]);

  const progress = useProgress();

  return (
    <View>
      <Text>{progress.position}</Text>
      {/* <ProgressBar progress={progress.position} buffered={progress.buffered} /> */}
    </View>
  );
};

export default AudioPlayer;
