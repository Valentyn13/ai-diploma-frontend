import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WithTranslateYProps {
  children: React.ReactNode;
  value?: number;
  duration?: number;
  delay?: number;
}

const WithTranslateY: React.FC<WithTranslateYProps> = ({
  children,
  value = 0,
  duration = 600,
  delay = 0,
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(value, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [value, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default WithTranslateY;
