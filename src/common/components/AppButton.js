/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Platform, Text, TouchableOpacity } from 'react-native';

export default class AppButton extends React.PureComponent {
  render() {
    const { width } = Dimensions.get('screen');

    const {
      style,
      medium,
      thin,
      bold,
      black,
      light,
      children,
      ellipsizeMode = 'tail',
      numberOfLines = 0,
    } = this.props;
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
        {...this.props}
        style={{
          backgroundColor: '#273051',
          marginHorizontal: 40,
          paddingHorizontal: 10,
          paddingVertical: 12,
          borderRadius: 6,
          alignItems: 'center',
          width: width - 60,
        }}>
        <Text
          bold
          ellipsizeMode={ellipsizeMode}
          numberOfLines={numberOfLines}
          allowFontScaling={false}
          style={[{ fontFamily: font, color: 'white', fontSize: 20 }, style]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

AppButton.propTypes = {
  //   style: PropTypes.object,
  //   italic: PropTypes.bool,
  //   bold: PropTypes.bool,
  //   light: PropTypes.bool,
};
