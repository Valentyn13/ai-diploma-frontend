import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WithFadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  initialValue?: number;
}

const WithFadeIn: React.FC<WithFadeInProps> = ({
  children,
  duration = 600,
  delay = 0,
  initialValue = 0,
}) => {
  const fadeAnim = useSharedValue(initialValue);

  useEffect(() => {
    // Start the animation after the specified delay
    const timeoutId = setTimeout(() => {
      fadeAnim.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [duration, delay]); // You might not need fadeAnim as a dependency here

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default WithFadeIn;
