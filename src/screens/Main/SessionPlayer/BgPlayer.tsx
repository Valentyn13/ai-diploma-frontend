import { BG_TRACKS, SOUNDS_URL } from '@common/constants';
import { useBgTrackStore } from '@store/useBgTrackStore';
import React, { FC, useMemo } from 'react';
import Video from 'react-native-video';

const BgPlayer: FC = () => {
  const { selectedTrack, volume } = useBgTrackStore(state => state);

  const uri = useMemo(() => {
    if (selectedTrack === 'off') {
      return;
    }

    return `${SOUNDS_URL}${
      BG_TRACKS.find(({ id }) => id === selectedTrack)?.asset
    }`;
  }, [selectedTrack]);

  if (!uri) {
    return null;
  }

  return (
    <Video
      volume={volume}
      disableFocus
      ignoreSilentSwitch="ignore"
      source={{
        uri,
      }}
      audioOnly
      playInBackground
      repeat
    />
  );
};

export default BgPlayer;
