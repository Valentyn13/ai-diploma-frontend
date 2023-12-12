import CircularSlider from '@common/components/CircularSlider';
import isLowResolution from '@utils/isLowResolution';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { withTheme } from 'styled-components';

const SIZE = isLowResolution ? 100 : 120;
const WIDTH = isLowResolution ? 15 : 20;

const PAUSE_IMG = require('@common/assets/images/pause.png');
const PLAY_IMG = require('@common/assets/images/play.png');

const ButtonContainer = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
`;

const Img = styled.Image.attrs(({ icon }) => ({
  source: icon,
  resizeMode: 'contain',
}))`
  width: ${SIZE / 2}px;
  height: ${SIZE / 2}px;
`;

const PlayButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  top: ${SIZE / 4}px;
  left: ${SIZE / 4}px;
  width: ${SIZE / 2}px;
  height: ${SIZE / 2}px;
  align-items: center;
  justify-content: center;
`;

const CircularPlayButton = ({
  togglePlay,
  isPlaying,
  currentTime,
  onSliderEditStart,
  onSliderEditEnd,
  onSliderEditing,
  duration,
  theme,
  setCurrentTime,
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
      value={currentTime}
      onValueChange={setCurrentTime}
      maxValue={duration}
      {...{
        onSliderEditStart,
        onSliderEditEnd,
        onSliderEditing,
      }}
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

CircularPlayButton.propTypes = {
  togglePlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  currentTime: PropTypes.number,
  onSliderEditStart: PropTypes.func,
  onSliderEditEnd: PropTypes.func,
  onSliderEditing: PropTypes.func,
  duration: PropTypes.number,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      playerSliderColor: PropTypes.string,
      whiteColor: PropTypes.string,
      playerSliderStripColor: PropTypes.string,
    }),
  }),
  setCurrentTime: PropTypes.func,
};

export default withTheme(CircularPlayButton);
