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
      backgroundColor={selectedTrack === 'off' ? '#00000060' : '#FFEFD7'}
      color={selectedTrack === 'off' ? '#FFEFD7' : '#513F73'}
    />
  );
};

export default BgSelector;
