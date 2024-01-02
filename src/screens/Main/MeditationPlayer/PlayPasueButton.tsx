import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Line, Path } from 'react-native-svg';

const PlayPauseButton: FC<{ isPlaying: boolean; onBtnPress: () => void }> = ({
  isPlaying: initIsPlaying,
  onBtnPress = () => {},
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const animation = useSharedValue(0);

  const svgHeight = '45.5';
  const svgWidth = '30';

  const playPathD = 'M0 90.7759L60 45.7759L0 0.775879V90.7759Z';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(animation.value, [0, 1], [0, 360])}deg`,
        },
        {
          scale: interpolate(animation.value, [0, 0.5, 1], [1, 1.2, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    setIsPlaying(initIsPlaying);
    animation.value = withTiming(isPlaying ? 0 : 1, {
      duration: 300,
      easing: Easing.out(Easing.cubic), // Using easing function for smoother transition
    });
  }, [animation, initIsPlaying, isPlaying]);

  const onPress = (e: any) => {
    onBtnPress();
    e.stopPropagation();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={animatedStyle}>
        <Svg
          height={svgHeight}
          width={svgWidth}
          viewBox="0 0 60 91"
          fill="none">
          <Path d={playPathD} fill="#fff" opacity={isPlaying ? 0 : 1} />

          <G opacity={isPlaying ? 1 : 0}>
            <Line
              x1="10"
              y1="0"
              x2="10"
              y2="91"
              stroke="#fff"
              strokeWidth="8"
            />
            <Line
              x1="50"
              y1="0"
              x2="50"
              y2="91"
              stroke="#fff"
              strokeWidth="8"
            />
          </G>
        </Svg>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PlayPauseButton;
