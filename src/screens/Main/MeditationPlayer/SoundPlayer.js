import rowFlexDir from '@utils/rowFlexDir';
import PropTypes from 'deprecated-react-native-prop-types';
import React from 'react';
import { Slider, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const PAUSE_IMG = require('@common/assets/images/pause.png');
const PLAY_IMG = require('@common/assets/images/play.png');

const formatTime = seconds =>
  `${parseInt(seconds / (60 * 60), 10)
    .toString()
    .padStart(2, '0')}:${parseInt((seconds % (60 * 60)) / 60, 10)
    .toString()
    .padStart(2, '0')}:${parseInt(seconds % 60, 10)
    .toString()
    .padStart(2, '0')}`;

const Img = styled.Image.attrs(({ icon }) => ({
  source: icon,
}))`
  width: 30px;
  height: 30px;
`;

const Title = styled.Text`
  color: white;
  margin-left: 10px;
  margin-right: 10px;
`;

const Container = styled.View`
  padding: 15px;
  margin: 1px;
  flex-direction: ${rowFlexDir};
  align-items: center;
  background-color: rgba(100, 100, 100, 0.7);
`;

const MySlider = styled(Slider).attrs({
  maximumTrackTintColor: 'gray',
  minimumTrackTintColor: 'white',
  thumbTintColor: 'white',
})`
  flex: 1;
  align-self: center;
`;

const PlayButton = ({ togglePlay, isPlaying }) => (
  <TouchableOpacity onPress={togglePlay}>
    <Img icon={isPlaying ? PAUSE_IMG : PLAY_IMG} />
  </TouchableOpacity>
);

const TimeTitle = ({ seconds }) => <Title>{formatTime(seconds)}</Title>;

const SoundPlayer = ({
  togglePlay,
  isPlaying,
  currentTime,
  onSliderEditStart,
  onSliderEditEnd,
  onSliderEditing,
  duration,
}) => (
  <Container>
    <PlayButton {...{ togglePlay, isPlaying }} />
    <TimeTitle seconds={currentTime} />
    <MySlider
      onTouchStart={onSliderEditStart}
      onTouchEnd={onSliderEditEnd}
      onValueChange={onSliderEditing}
      value={currentTime}
      maximumValue={duration}
    />
    <TimeTitle seconds={duration} />
  </Container>
);

SoundPlayer.propTypes = {
  togglePlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  onSliderEditStart: PropTypes.func.isRequired,
  onSliderEditEnd: PropTypes.func.isRequired,
  onSliderEditing: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
};

PlayButton.propTypes = {
  togglePlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

TimeTitle.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default SoundPlayer;
