import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import React, { FC, useState } from 'react';
import { View } from 'react-native';

interface Props {
  colors: string[];
}

const GradientBackground: FC<Props> = ({ colors }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <View style={{ width: '100%', height: '100%' }} onLayout={onLayout}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Canvas style={{ width: dimensions.width, height: dimensions.height }}>
          <Rect x={0} y={0} width={dimensions.width} height={dimensions.height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(dimensions.width, dimensions.height)}
              colors={colors}
            />
          </Rect>
        </Canvas>
      )}
    </View>
  );
};

export default GradientBackground;
