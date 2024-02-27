import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
} from 'react-native';

interface InputProps extends TextInputProps {
  style?: any;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    ref.current?.blur();
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          isFocused && styles.focused,
          props.disabled && styles.disabled,
          style,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'right',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    color: '#111827',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  focused: {
    borderColor: '#94a3b8',
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    borderColor: '#e5e7eb',
  },
});

export default Input;
