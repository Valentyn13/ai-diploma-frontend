import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WithScaleProps {
  children: React.ReactNode;
  scaleValue?: number;
  duration?: number;
  delay?: number;
}

const WithScale: React.FC<WithScaleProps> = ({
  children,
  scaleValue = 1,
  duration = 600,
  delay = 0,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(scaleValue, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [scaleValue, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default WithScale;
