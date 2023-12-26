import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface WithPulseProps {
  children: React.ReactNode;
  scaleMin?: number; // The minimum scale
  scaleMax?: number; // The maximum scale
  duration?: number; // Duration of one pulse cycle
}

const WithPulse: React.FC<WithPulseProps> = ({
  children,
  scaleMin = 0.9,
  scaleMax = 1.1,
  duration = 1000,
}) => {
  const scale = useSharedValue(scaleMin);

  useEffect(() => {
    // Repeat the pulse animation indefinitely
    scale.value = withRepeat(
      withSequence(
        withTiming(scaleMax, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(scaleMin, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1, // Infinite loops
      false, // No reverse
    );
  }, [scaleMin, scaleMax, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default WithPulse;
