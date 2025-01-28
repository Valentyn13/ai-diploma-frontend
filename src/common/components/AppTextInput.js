import React from 'react';
import { TextInput } from 'react-native';

export default class AppTextInput extends React.PureComponent {
  render() {
    const { style, children } = this.props;
    let font = 'Rubik';

    return (
      <TextInput
        {...this.props}
        ref={ref => (this.textInput = ref)}
        allowFontScaling={false}
        placeholderTextColor="#000000"
        className="text-black"
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
