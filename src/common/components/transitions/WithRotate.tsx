import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WithRotateProps {
  children: React.ReactNode;
  degrees?: number; // The rotation in degrees
  duration?: number; // Duration of the animation
  delay?: number; // Delay of the animation
}

const WithRotate: React.FC<WithRotateProps> = ({
  children,
  degrees = 0,
  duration = 500,
  delay = 0,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(degrees, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [degrees, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default WithRotate;
