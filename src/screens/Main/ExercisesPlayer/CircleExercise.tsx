import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedCircleProps {
  sequences: number[];
}

const CircleExercise: FC<PropsWithChildren & AnimatedCircleProps> = ({
  sequences,
  children,
}) => {
  const { width, height } = useWindowDimensions();

  const xCenter = width / 2;
  const yCenter = height / 2;
  const circleDiameter = width * 0.8;
  const radius = circleDiameter * 0.06;
  const bigCircleRadius = circleDiameter / 2;

  const path = Skia.Path.Make();
  path.addOval(
    Skia.XYWHRect(
      xCenter - bigCircleRadius,
      yCenter - bigCircleRadius,
      circleDiameter,
      circleDiameter,
    ),
  );

  const angle = useSharedValue(0);

  const translateX = useDerivedValue(
    () => xCenter + bigCircleRadius * Math.cos(angle.value),
  );
  const translateY = useDerivedValue(
    () => yCenter + bigCircleRadius * Math.sin(angle.value),
  );

  const totalDuration = sequences.reduce((acc, cur) => acc + cur, 0);

  const indicatorAngles = sequences.map((duration, index) => {
    const sumOfPreviousDurations = sequences
      .slice(0, index)
      .reduce((acc, cur) => acc + cur, 0);
    return (sumOfPreviousDurations / totalDuration) * 2 * Math.PI;
  });

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: totalDuration,
        easing: Easing.linear,
      }),
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

        {indicatorAngles.map((angle2, index) => {
          const rectWidth = 14;
          const circleRadius = rectWidth / 2;

          const circleCenterX = xCenter + bigCircleRadius * Math.cos(angle2);
          const circleCenterY = yCenter + bigCircleRadius * Math.sin(angle2);

          return (
            <Circle
              key={index}
              cx={circleCenterX}
              cy={circleCenterY}
              r={circleRadius}
              color="#FFEFD7"
            />
          );
        })}
        <Circle cx={translateX} cy={translateY} r={radius} color="#273051" />
      </Canvas>
    </View>
  );
};

export default CircleExercise;
