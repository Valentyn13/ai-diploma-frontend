import PropTypes from 'deprecated-react-native-prop-types';
import React from 'react';
import { Platform, TextInput } from 'react-native';

export default class AppTextInput extends React.PureComponent {
  render() {
    const { style, thin, black, medium, bold, light, children } = this.props;
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
      <TextInput
        {...this.props}
        ref={ref => (this.textInput = ref)}
        allowFontScaling={false}
        placeholderTextColor="#000000"
        style={[style, { fontFamily: font }]}>
        {children}
      </TextInput>
    );
  }

  componentDidMount() {
    if (this.props.ref != null) {
      this.props.ref(this);
    }
  }

  focus() {
    this.textInput.focus();
  }
}

AppTextInput.propTypes = {
  style: PropTypes.object,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  light: PropTypes.bool,
};
