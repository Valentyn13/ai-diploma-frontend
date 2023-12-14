import CircularSlider from '@common/components/CircularSlider';
import isLowResolution from '@utils/isLowResolution';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
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

const PAUSE_IMG: ImageSourcePropType = require('@common/assets/images/pause.png');
const PLAY_IMG: ImageSourcePropType = require('@common/assets/images/play.png');

const ButtonContainer = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
`;

const Img = styled.Image.attrs(({ icon }: { icon: ImageSourcePropType }) => ({
  source: icon,
  resizeMode: 'contain',
}))`
  width: ${SIZE / 2}px;
  height: ${SIZE / 2}px;
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
  // setCurrentTime,
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
      // onValueChange={setCurrentTime}
      maxValue={duration!}
      onSliderEditStart={onSliderEditStart!}
      onSliderEditEnd={onSliderEditEnd!}
      onSliderEditing={onSliderEditing!}
    />

    <PlayButtonWrapper onPress={togglePlay}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ position: 'absolute' }}
        />
      ) : (
        <Img icon={isPlaying ? PAUSE_IMG : PLAY_IMG} />
      )}
    </PlayButtonWrapper>
  </ButtonContainer>
);

export default withTheme(CircularPlayButton);
