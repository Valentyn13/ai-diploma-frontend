import React, { FC } from 'react';
import styled from 'styled-components/native';

import { ButtonTitle } from './Styled';

interface ButtonProps {
  title?: string;
  isText?: boolean;
  onPress: () => void;
  big?: boolean;
  fb?: boolean;
  logout?: boolean;
  bgColor?: string;
  titleColor?: string;
  width?: number;
}

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ theme: { colors }, fb, logout, bgColor }) =>
    fb
      ? colors.facebookBgColor
      : logout
      ? colors.logoutButtonColor
      : bgColor && colors[bgColor]
      ? colors[bgColor]
      : colors.buttonColor};
  padding: ${({ big }) => (big ? '16px' : '12px')} 32px;
  justify-content: center;
  align-self: ${({ big }) => (big ? 'stretch' : 'center')};
  border-radius: 8px;
  elevation: 3; /* Add elevation for a subtle shadow effect (Android) */
  shadow-color: #000; /* Add shadow color (iOS) */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const Button: FC<ButtonProps> = ({
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

export default Button;
