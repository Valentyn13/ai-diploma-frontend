import { EXERCISES } from '@common/constants';
import { Canvas, LinearGradient, Path, Skia } from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const stringToSeed = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
};

const getRandomColor = seed => {
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const minValue = 50;
  const r = Math.floor(random() * (256 - minValue) + minValue);
  const g = Math.floor(random() * (256 - minValue) + minValue);
  const b = Math.floor(random() * (256 - minValue) + minValue);

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const createWobblyPath = (width, height, phase) => {
  const path = Skia.Path.Make();
  path.moveTo(0, 0);
  for (let x = 0; x < width; x++) {
    const y = Math.sin((x / width) * 2 * Math.PI + phase) * 10 + height / 1.3;
    path.lineTo(x, y);
  }
  path.lineTo(width, height);
  path.lineTo(0, height);
  path.close();
  return path;
};

const Background = ({ seed: seedString = '0' }) => {
  const { width, height } = useWindowDimensions();
  const phase = useSharedValue(0);

  useEffect(() => {
    phase.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 2000 }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // Your animated styles go here.
      // For example, opacity or transform properties.
      // Since we're not directly animating the path, this might be left simple or even empty.
    };
  });

  const [colors, setColors] = useState(() => {
    return (
      EXERCISES.find(exercise => exercise.id === seedString)?.colors || [
        getRandomColor(stringToSeed(seedString)),
        getRandomColor(stringToSeed(seedString) + 1),
      ]
    );
  });

  useEffect(() => {
    const seed = stringToSeed(seedString);
    setColors(
      EXERCISES.find(exercise => exercise.id === seedString)?.colors || [
        getRandomColor(seed),
        getRandomColor(seed + 1),
      ],
    );
  }, [seedString]);

  const wobblyPath = createWobblyPath(width, height, phase.value);

  return (
    <View className="flex-1">
      <Canvas className="flex-1">
        <Path path={wobblyPath}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: width, y: height }}
            colors={colors}
          />
        </Path>
      </Canvas>
    </View>
  );
};

export default Background;
