import React from 'react';
import {Text, Platform} from 'react-native';

export default class AppText extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const {style, medium, thin, black, bold, light, children, ellipsizeMode = 'tail', numberOfLines = 0} = this.props;
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
      <Text
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[{fontFamily: font}, style]}>
        {children}
      </Text>
    );
  }
}

AppText.propTypes = {
  // style: PropTypes.object,
  //   italic: PropTypes.bool,
  //   bold: PropTypes.bool,
  //   light: PropTypes.bool,
};
