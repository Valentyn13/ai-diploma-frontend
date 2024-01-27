import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

const FadingText: FC<{
  sequences: { type: string; seconds: number }[];
}> = ({ sequences }) => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const text = useMemo(() => sequences[index].type, [index, sequences]);
  const duration = useMemo(
    () => sequences[index].seconds * 1000,
    [index, sequences],
  );

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
              setIndex(prevIndex => (prevIndex + 1) % sequences.length);
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
  }, [index, fadeAnim, sequences.length]);

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
