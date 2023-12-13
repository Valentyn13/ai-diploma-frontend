/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  style?: object;
  medium?: boolean;
  thin?: boolean;
  bold?: boolean;
  black?: boolean;
  light?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
}

const AppButton: React.FC<AppButtonProps> = ({
  style,
  medium,
  thin,
  bold,
  black,
  light,
  children,
  ellipsizeMode = 'tail',
  numberOfLines = 0,
  ...props
}) => {
  const { width } = Dimensions.get('screen');

  let font = Platform.OS === 'ios' ? 'AlmoniDLAAA' : 'almoni-dl-aaa';
  if (bold) {
    font += '-bold';
  } else if (light) {
    font += '-light';
  } else if (black) {
    font += '-black';
  } else if (thin) {
    font += '-thin';
  } else if (medium) {
    font += '-medium';
  } else {
    font += '';
  }

  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: '#273051',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        width: width,
        ...style,
      }}>
      <Text
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={{
          fontFamily: font,
          color: 'white',
          fontSize: 20,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
