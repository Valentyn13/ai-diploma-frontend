import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export const CircleButton: React.FC<{
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  size?: number;
  color?: string;
  icon: string;
}> = ({
  onPress,
  disabled,
  backgroundColor,
  size = 10,
  icon,
  color = '#fff',
  ...props
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className="flex-row items-center justify-center"
    style={{
      backgroundColor,
      width: size,
      height: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    {...props}>
    <Icon name={icon} size={size / 2} color={color} />
  </TouchableOpacity>
);
