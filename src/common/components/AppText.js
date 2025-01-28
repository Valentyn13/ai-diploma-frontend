import React from 'react';
import { Text } from 'react-native';

export default class AppText extends React.PureComponent {
  render() {
    const {
      style,
      children,
      ellipsizeMode = 'tail',
      numberOfLines = 0,
    } = this.props;
    let font = 'Rubik';

    return (
      <Text
        {...this.props}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[{ fontFamily: font }, style]}>
        {children}
      </Text>
    );
  }
}
