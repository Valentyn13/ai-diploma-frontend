import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import React, { FC } from 'react';
import { View, useWindowDimensions } from 'react-native';

const stringToSeed = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
};

const createWobblyPath = (width, height, seed) => {
  const amplitude = 10 + (seed % 20); // Adjust amplitude based on seed
  const path = Skia.Path.Make();
  path.moveTo(0, 0);

  for (let x = 0; x < width; x++) {
    const scaleFactor = Math.cos((x / width) * Math.PI);
    const y =
      height / 8 +
      Math.sin((x / width) * 2 * Math.PI) * amplitude * scaleFactor;

    path.lineTo(x, y);
  }

  path.lineTo(width, 0);
  path.lineTo(0, 0);
  path.close();
  return path;
};

const Wobble: FC<{
  seed?: string;
}> = ({ seed = 'default' }) => {
  const { width, height } = useWindowDimensions();

  const wobblyPath = createWobblyPath(width, height, stringToSeed(seed));

  return (
    <View className="absolute flex-1 h-full w-full">
      <Canvas style={{ flex: 1 }}>
        <Path path={wobblyPath} color="#FFF6EA" />
      </Canvas>
    </View>
  );
};

export default Wobble;
