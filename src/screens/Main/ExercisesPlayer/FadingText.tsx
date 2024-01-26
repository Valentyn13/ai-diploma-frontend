import React, { FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const texts = ['נשמו', 'החזיקו', 'נשפו', 'החזיקו'];

const FadingText: FC<{ duration: number }> = ({ duration }) => {
  const [index, setIndex] = React.useState(0);
  const text = texts[index];
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const animationDuration = 400;
    const displayDuration = duration - animationDuration * 2;

    const animate = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          if (isMounted) {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: animationDuration,
              useNativeDriver: true,
            }).start(() => {
              // Update index
              setIndex(prevIndex => (prevIndex + 1) % texts.length);
            });
          }
        }, displayDuration);
      });
    };

    animate();

    const interval = setInterval(animate, duration);

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [duration, index, fadeAnim]);

  return (
    <Animated.Text
      style={{
        opacity: fadeAnim,
      }}
      className="text-white text-3xl">
      {text}
    </Animated.Text>
  );
};

export default FadingText;
