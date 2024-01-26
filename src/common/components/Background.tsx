import { EXERCISES } from '@common/constants';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

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

const Background = ({ seedString = '0' }) => {
  const { width, height } = useWindowDimensions();

  const [colors, setColors] = useState(() => {
    return (
      EXERCISES.find(exercise => exercise.key === seedString)?.colors || [
        getRandomColor(stringToSeed(seedString)),
        getRandomColor(stringToSeed(seedString) + 1),
      ]
    );
  });

  useEffect(() => {
    const seed = stringToSeed(seedString);
    setColors(
      EXERCISES.find(exercise => exercise.key === seedString)?.colors || [
        getRandomColor(seed),
        getRandomColor(seed + 1),
      ],
    );
  }, [seedString]);

  return (
    <View className="absolute flex-1 h-full w-full">
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
    </View>
  );
};

export default Background;
