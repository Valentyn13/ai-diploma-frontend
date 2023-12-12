import { SubTitle } from '@common/components/Styled';
import PropTypes from 'deprecated-react-native-prop-types';
import React from 'react';
import styled from 'styled-components';

const TimesLabelContainer = styled.View`
  margin-top: 15px;
  flex-direction: row-reverse;
`;

const Separator = styled(SubTitle)`
  margin-left: 5px;
  margin-right: 5px;
`;

const formatTime = seconds =>
  `${parseInt(seconds / 60, 10)
    .toString()
    .padStart(2, '0')}:${parseInt(seconds % 60, 10)
    .toString()
    .padStart(2, '0')}`;

const TimesLabel = ({ currentTime, duration, color }) => (
  <TimesLabelContainer>
    <SubTitle t={formatTime(currentTime)} {...{ color }} />
    <Separator t="/" {...{ color }} />
    <SubTitle t={formatTime(duration)} {...{ color }} />
  </TimesLabelContainer>
);

TimesLabel.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default TimesLabel;
