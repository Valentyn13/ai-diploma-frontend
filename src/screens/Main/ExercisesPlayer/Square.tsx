import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const squareSize = 256;
const radius = squareSize * 0.1;
const borderRadius = 25;

const AnimatedCircleOnSquarePath: FC<
  PropsWithChildren & { duration: number }
> = ({ children, duration }) => {
  const { width, height } = useWindowDimensions();

  const xSquare = (width - squareSize) / 2;
  const ySquare = (height - squareSize) / 2;

  const path = Skia.Path.Make();
  path.addRRect(
    Skia.RRectXY(
      Skia.XYWHRect(xSquare, ySquare, squareSize, squareSize),
      borderRadius,
      borderRadius,
    ),
  );

  const xCircle = useSharedValue(xSquare + squareSize);
  const yCircle = useSharedValue(ySquare);

  useEffect(() => {
    xCircle.value = withRepeat(
      withSequence(
        withTiming(xSquare, { duration }),
        withTiming(xSquare, { duration }),
        withTiming(xSquare + squareSize, { duration }),
        withTiming(xSquare + squareSize, { duration }),
      ),
      -1,
      false,
    );

    yCircle.value = withRepeat(
      withSequence(
        withTiming(ySquare, { duration }),
        withTiming(ySquare + squareSize, { duration }),
        withTiming(ySquare + squareSize, { duration }),
        withTiming(ySquare, { duration }),
      ),
      -1,
      false,
    );
  }, []);

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        {children}
      </View>
      <Canvas style={{ flex: 1 }}>
        <Path path={path} color="#FFEFD7" style="stroke" strokeWidth={5} />
        <Circle cx={xCircle} cy={yCircle} r={radius} color="#D66366" />
      </Canvas>
    </View>
  );
};

export default AnimatedCircleOnSquarePath;
