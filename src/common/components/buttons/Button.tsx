import React, { useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  disabled = false,
  variant = 'primary',
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Animated.View
      style={[styles.button, styles[variant], style, animatedStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          styles[variant],
          style,
          disabled && styles.disabled,
        ]}>
        <Text style={[styles.text, disabled && styles.disabledText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1,
    color: '#ffffff',
  },
  primary: {
    backgroundColor: '#273051',
    borderColor: '#273051',
  },
  secondary: {
    backgroundColor: '#e2e8f0',
    borderColor: '#cbd5e1',
    color: '#334155',
  },
  accent: {
    backgroundColor: '#f472b6',
    borderColor: '#ec4899',
    color: '#ffffff',
  },
  neutral: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    color: '#374151',
  },
  disabled: {
    backgroundColor: '#9ca3af',
    borderColor: '#9ca3af',
    color: '#ffffff',
  },
  disabledText: {
    color: '#ffffff',
  },
});

export default Button;
