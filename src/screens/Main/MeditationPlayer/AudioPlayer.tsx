import React, { FC, useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

interface Props {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

const AudioPlayer: FC<Props> = ({ id, url, title, artist, artwork }) => {
  useEffect(() => {
    const addTrack = async () => {
      await TrackPlayer.add({
        id,
        url,
        title,
        artist,
        artwork,
      });

      TrackPlayer.play();
    };

    addTrack();

    return () => {
      TrackPlayer.reset();
    };
  }, [artist, artwork, id, title, url]);

  return <></>;
};

export default AudioPlayer;
