import React, { FC, PropsWithChildren, useState } from 'react';
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CircularSlider: FC<
  PropsWithChildren & {
    initStep?: number;
    steps?: number;
    onStepChange?: (step: number) => void;
    size?: number;
    strokeWidth?: number;
  }
> = ({
  initStep = 1,
  steps = 12,
  onStepChange = (_: number) => {},
  children,
  size = 260,
  strokeWidth = 20,
}) => {
  const anglePerStep = 360 / steps;
  const [angle, setAngle] = useState(anglePerStep * initStep);
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const getAngleFromTouch = (touchX, touchY) => {
    const x = touchX - size / 2;
    const y = touchY - size / 2;
    let radian = Math.atan2(y, x);
    let touchAngle = radian * (180 / Math.PI);
    if (touchAngle < 0) {
      touchAngle = 360 + touchAngle;
    }
    touchAngle = (touchAngle + 270) % 360;
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
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: evt => {
      updateAngle(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
    },
    onPanResponderMove: evt => {
      updateAngle(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
    },
  });

  const strokeDashoffset = circumference - (angle / 360) * circumference;

  const renderStepIndicators = () => {
    const indicators = [];
    for (let i = 0; i < steps; i++) {
      const stepAngle = (i * anglePerStep * Math.PI) / 180;
      const indicatorX = size / 2 + radius * Math.cos(stepAngle);
      const indicatorY = size / 2 + radius * Math.sin(stepAngle);
      indicators.push(
        <Circle key={i} cx={indicatorX} cy={indicatorY} r={5} fill="#4f4f4f" />,
      );
    }
    return indicators;
  };

  return (
    <View style={styles.container}>
      {children}
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        {...panResponder.panHandlers}>
        <G rotation="90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#d6d6d6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {renderStepIndicators()}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#273051"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 320,
    width: '100%', // Ensure the parent View fills the screen width
  },
});

export default CircularSlider;
