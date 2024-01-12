import { BG_TRACKS } from '@common/constants';
import { useBgTrackStore } from '@store/useBgTrackStore';
import logger from '@utils/logger';
import React, { FC, useMemo } from 'react';
import Video from 'react-native-video';

const SOUNDS_URL = 'https://d137rfe7jg135q.cloudfront.net/sounds/';

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
      audioOnly
      disableFocus
      ignoreSilentSwitch="ignore"
      source={{
        uri,
      }}
      onError={error => {
        logger.log('error', JSON.stringify(error));
      }}
      repeat
    />
  );
};

export default BgPlayer;
