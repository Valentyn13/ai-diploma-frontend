import { BlurView } from '@react-native-community/blur';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const calculateIndicatorPositions = (steps, radius, size) => {
  const positions = [];
  for (let step = 0; step < steps; step++) {
    const angle = (360 / steps) * step - 90; // Adjusting by 90 degrees to start from the top
    const angleRadians = (Math.PI / 180) * angle;
    const x = size / 2 + radius * Math.cos(angleRadians);
    const y = size / 2 + radius * Math.sin(angleRadians);
    positions.push({ x, y });
  }
  return positions;
};

const CircularSlider: FC<
  PropsWithChildren & {
    initStep?: number;
    steps?: number;
    onStepChange?: (step: number) => void;
    size?: number;
    strokeWidth?: number;
    sliderColor?: string;
  }
> = ({
  initStep = 1,
  steps = 12,
  onStepChange = (_: number) => {},
  children,
  size = 260,
  strokeWidth = 20,
  sliderColor = '#273051',
}) => {
  const [anglePerStep, setAnglePerStep] = useState(360 / steps);
  const [angle, setAngle] = useState(anglePerStep * initStep);
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const newAnglePerStep = 360 / steps;
    setAnglePerStep(newAnglePerStep);
    setAngle(newAnglePerStep * initStep);
  }, [steps, initStep]);

  const getAngleFromTouch = (touchX, touchY) => {
    const x = touchX - size / 2;
    const y = touchY - size / 2;
    let radian = Math.atan2(y, x);
    let touchAngle = radian * (180 / Math.PI);
    if (touchAngle < 0) {
      touchAngle = 360 + touchAngle;
    }
    touchAngle = (touchAngle + 90) % 360;
    return touchAngle;
  };

  const updateAngle = (touchX, touchY) => {
    const currentAngle = getAngleFromTouch(touchX, touchY);
    const stepAngle = Math.round(currentAngle / anglePerStep) * anglePerStep;
    let currentStep = Math.round(stepAngle / anglePerStep);
    if (currentStep < 1) {
      currentStep = 1;
      setAngle(anglePerStep);
    } else {
      setAngle(stepAngle);
    }

    onStepChange(currentStep);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;
      return isTouchOnStroke(locationX, locationY);
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;
      const { moveX, moveY } = gestureState;
      const localX = moveX - evt.nativeEvent.pageX + locationX;
      const localY = moveY - evt.nativeEvent.pageY + locationY;
      return isTouchOnStroke(localX, localY);
    },
    onPanResponderGrant: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      updateAngle(locationX, locationY);
    },
    onPanResponderMove: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      updateAngle(locationX, locationY);
    },
  });

  const indicatorRadius = 12;

  const isTouchOnStroke = (
    touchX: number,
    touchY: number,
    padding = indicatorRadius * 2,
  ) => {
    // padding default value set to 5 pixels
    const x = touchX - size / 2;
    const y = touchY - size / 2;
    const distanceFromCenter = Math.sqrt(x * x + y * y);
    return (
      distanceFromCenter >= radius - strokeWidth / 2 - padding &&
      distanceFromCenter <= radius + strokeWidth / 2 + padding
    );
  };

  const strokeDashoffset = circumference - (angle / 360) * circumference;
  const endAngleRadians = (angle * Math.PI) / 180;
  const endCircleX = size / 2 + radius * Math.cos(endAngleRadians);
  const endCircleY = size / 2 + radius * Math.sin(endAngleRadians);

  const indicatorPositions = calculateIndicatorPositions(steps, radius, size);

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size }} className="absolute">
        <BlurView
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          blurType="light"
          blurAmount={10}>
          {children}
        </BlurView>
      </View>
      <Svg
        width={size + 30}
        height={size + 30}
        viewBox={`${-15} ${-15} ${size + 30} ${size + 30}`}
        {...panResponder.panHandlers}>
        <G rotation="270" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#fff"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {!!steps && (
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={sliderColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          )}
          <Circle
            cx={endCircleX}
            cy={endCircleY}
            r={indicatorRadius}
            fill={sliderColor}
            stroke="#fff"
            strokeWidth={2}
          />
        </G>
        {indicatorPositions.map((pos, index) => (
          <Circle
            key={index}
            cx={pos.x}
            cy={pos.y}
            r={indicatorRadius / 2.5}
            fill={sliderColor}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularSlider;
