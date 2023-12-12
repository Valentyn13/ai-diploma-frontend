import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ButtonTitle } from './Styled';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme: { colors }, fb, logout, bgColor }) =>
    fb
      ? colors.facebookBgColor
      : logout
      ? colors.logoutButtonColor
      : bgColor && colors[bgColor]
      ? colors[bgColor]
      : colors.buttonColor};
  padding-top: ${({ big }) => (big ? 14 : 5)};
  padding-bottom: ${({ big }) => (big ? 14 : 5)};
  justify-content: center;
  padding-right: 34px;
  padding-left: 34px;
  align-self: ${({ big }) => (big ? 'stretch' : 'center')};
`;

const Button = ({
  title,
  isText,
  onPress,
  big,
  fb,
  logout,
  bgColor,
  titleColor,
  width,
}) => (
  <ButtonContainer {...{ onPress, big, fb, logout, bgColor, width }}>
    <ButtonTitle
      titleColor={titleColor}
      k={!isText && title}
      t={isText && title}
    />
  </ButtonContainer>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isText: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  big: PropTypes.bool,
  fb: PropTypes.bool,
  logout: PropTypes.bool,
  bgColor: PropTypes.string,
  titleColor: PropTypes.string,
};

Button.defaultProps = {
  isText: false,
  big: false,
  fb: false,
  logout: false,
  bgColor: '',
};

export default Button;
