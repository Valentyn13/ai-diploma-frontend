import CircularSlider from '@common/components/CircularSlider';
import { colors } from '@common/theme';
import isLowResolution from '@utils/isLowResolution';
import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled, { DefaultTheme, withTheme } from 'styled-components/native';

interface CircularPlayButtonProps {
  togglePlay?: () => void;
  isPlaying?: boolean;
  currentTime?: number;
  onSliderEditStart?: () => void;
  onSliderEditEnd?: () => void;
  onSliderEditing?: () => void;
  duration?: number;
  theme: DefaultTheme;
  setCurrentTime?: (time: number) => void;
  isLoading?: boolean;
}

const SIZE = isLowResolution ? 100 : 120;
const WIDTH = isLowResolution ? 15 : 20;

const ButtonContainer = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
`;

const PlayButtonWrapper = styled(TouchableOpacity)`
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
  theme,
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
        <Icon
          style={{ marginRight: 2 }}
          name={isPlaying ? 'pause' : 'play'}
          size={SIZE / 2}
          color={colors.whiteColor}
        />
      )}
    </PlayButtonWrapper>
  </ButtonContainer>
);

export default withTheme(CircularPlayButton);
