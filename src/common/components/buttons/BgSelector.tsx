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
      backgroundColor={'#F5F3F781'}
      color={'#203365'}
    />
  );
};

export default BgSelector;
