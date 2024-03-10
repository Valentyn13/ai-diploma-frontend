import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import React, { FC, useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

const stringToSeed = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
};

const getRandomColor = seed => {
  let localSeed = seed;
  const random = () => {
    localSeed = (localSeed * 16807) % 2147483647;
    return (localSeed - 1) / 2147483646;
  };

  const minValue = 180;
  const r = Math.floor(random() * (256 - minValue) + minValue);
  const g = Math.floor(random() * (256 - minValue) + minValue);
  const b = Math.floor(random() * (256 - minValue) + minValue);

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const Gradient: FC<{ seed?: string; colors?: string[]; angle?: number }> = ({
  colors,
  seed: seedProp,
  angle = 0, // Default angle is 0 degrees
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [computedColors, setComputedColors] = useState<string[]>([]);

  useEffect(() => {
    if (!colors) {
      const seed = stringToSeed(seedProp || `defaultSeed${Date.now()}`);
      const defaultColors = [
        getRandomColor(seed),
        getRandomColor(
          stringToSeed(
            seedProp ? `defaultSeed${seedProp}` : `defaultSeed${Date.now()}`,
          ),
        ),
      ];
      setComputedColors(defaultColors);
    } else {
      setComputedColors(colors);
    }
  }, [colors, seedProp]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  // Convert angle to radians for calculation
  const angleRadians = (angle * Math.PI) / 180;
  // Calculate vector based on angle
  const dx = Math.cos(angleRadians);
  const dy = Math.sin(angleRadians);
  // Determine start and end points
  const startX = (size.width / 2) * (1 - dx);
  const startY = (size.height / 2) * (1 - dy);
  const endX = (size.width / 2) * (1 + dx);
  const endY = (size.height / 2) * (1 + dy);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
      }}
      onLayout={onLayout}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={size.width} height={size.height}>
          <LinearGradient
            start={vec(startX, startY)}
            end={vec(endX, endY)}
            colors={computedColors}
          />
        </Rect>
      </Canvas>
    </View>
  );
};

export default Gradient;
