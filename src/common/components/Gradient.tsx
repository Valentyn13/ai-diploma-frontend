import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import React, { FC, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

const Gradient: FC<{ colors: string[] }> = ({ colors }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

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
            start={vec(0, 0)}
            end={vec(size.width, size.height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
    </View>
  );
};

export default Gradient;
