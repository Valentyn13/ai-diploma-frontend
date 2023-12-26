import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { TouchableHighlightProps } from 'react-native-gesture-handler';

interface HighlightButtonProps {
  onPress: () => void;
  disabled: boolean;
  text: string;
}

const Button: React.FC<TouchableHighlightProps & HighlightButtonProps> = ({
  onPress,
  disabled,
  text,
  ...props
}) => {
  return (
    <TouchableHighlight
      style={{ borderRadius: 8, overflow: 'hidden' }}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      <View
        style={{
          backgroundColor: disabled ? '#ddd' : '#273051',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
