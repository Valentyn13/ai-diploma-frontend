import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

const formatTime = (seconds: number) =>
  `${parseInt(seconds / 60, 10)
    .toString()
    .padStart(2, '0')}:${parseInt(seconds % 60, 10)
    .toString()
    .padStart(2, '0')}`;

const TimesLabel = ({ currentTime, duration, color }) => (
  <View className="flex flex-row justify-between items-center mt-5">
    <Text className="text-xs font-light text-white">
      {formatTime(duration)}
    </Text>
    <Text className="text-xs font-light text-white">
      {formatTime(currentTime)}
      {' / '}
    </Text>
  </View>
);

TimesLabel.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default TimesLabel;
