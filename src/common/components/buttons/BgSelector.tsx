import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useBgTrackStore } from '../../../store/useBgTrackStore';
import { CircleButton } from './CircleButton';

const BgSelector: React.FC = () => {
  const { navigate } = useNavigation();
  const { selectedTrack } = useBgTrackStore(state => state);

  const toggleBgMenu = () => {
    navigate('Main', {
      screen: 'BGMusicPicker',
    });
  };

  return (
    <CircleButton
      size={40}
      icon="music"
      onPress={toggleBgMenu}
      backgroundColor={selectedTrack === 'off' ? '#00000060' : 'white'}
      color={selectedTrack === 'off' ? 'white' : 'black'}
    />
  );
};

export default BgSelector;
