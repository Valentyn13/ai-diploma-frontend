import CircularSlider from '@common/components/CircularSlider';
import theme from '@common/theme';
import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import PlayPauseButton from './PlayPasueButton';

interface CircularPlayButtonProps {
  togglePlay: () => void;
  isPlaying?: boolean;
  currentTime?: number;
  onSliderEditStart?: () => void;
  onSliderEditEnd?: (endTime: any) => void;
  onSliderEditing?: (value: any) => void;
  duration?: number;
  setCurrentTime?: (time: number) => void;
  isLoading?: boolean;
}

const SIZE = 120;
const WIDTH = 20;

const ButtonContainer = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
`;

const PlayButtonWrapper = styled(TouchableOpacity)`
  padding: 12px;
  position: absolute;
  top: ${SIZE / 4}px;
  left: ${SIZE / 4}px;
  width: ${SIZE / 2}px;
  height: ${SIZE / 2}px;
  align-items: center;
  justify-content: center;
`;

const CircularPlayButton: FC<CircularPlayButtonProps> = ({
  togglePlay,
  isPlaying,
  currentTime,
  onSliderEditStart,
  onSliderEditEnd,
  onSliderEditing,
  duration,
  isLoading,
}) => (
  <ButtonContainer>
    <CircularSlider
      width={SIZE}
      height={SIZE}
      strokeWidth={WIDTH}
      meterColor={theme.colors.playerSliderColor}
      innerStripColor={theme.colors.whiteColor}
      outerStripColor={theme.colors.playerSliderStripColor}
      value={currentTime!}
      maxValue={duration!}
      onSliderEditStart={onSliderEditStart!}
      onSliderEditEnd={onSliderEditEnd!}
      onSliderEditing={onSliderEditing!}
    />

    <PlayButtonWrapper onPress={togglePlay}>
      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <PlayPauseButton isPlaying={isPlaying!} onBtnPress={togglePlay!} />
      )}
    </PlayButtonWrapper>
  </ButtonContainer>
);

export default CircularPlayButton;
