import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface SlideInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  fromValue?: number; // Starting X position, likely a negative value
  toValue?: number; // Ending X position, typically 0
}

const WithSlideInY: React.FC<SlideInProps> = ({
  children,
  duration = 600,
  delay = 0,
  fromValue = 100,
  toValue = 0,
}) => {
  const translateY = useSharedValue(fromValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      translateY.value = withTiming(toValue, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [duration, delay]);

  const slideInStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={slideInStyle}>{children}</Animated.View>;
};

export default WithSlideInY;
