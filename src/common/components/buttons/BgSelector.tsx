import { useNavigation } from '@react-navigation/native';
import { useBgTrackStore } from '@store/useBgTrackStore';
import React from 'react';

import { CircleButton } from './CircleButton';

const BgSelector: React.FC = () => {
  const { navigate } = useNavigation();
  const { selectedTrack } = useBgTrackStore(state => state);

  const toggleBgMenu = () => {
    // @ts-ignore
    navigate('Main', {
      screen: 'BGMusicPicker',
    });
  };

  return (
    <CircleButton
      size={40}
      icon="music"
      onPress={toggleBgMenu}
      backgroundColor={'#0F1B4812'}
      color={'#0F1B48'}
    />
  );
};

export default BgSelector;
