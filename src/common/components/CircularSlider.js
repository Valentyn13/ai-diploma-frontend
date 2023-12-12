import useComponentSize from '@services/hooks/useComponentSize';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useCallback } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

// https://github.com/steveliles/react-native-circular-slider-example/blob/master/CircularSlider.js

let locationPageOffset = null;

const CircularSlider = ({
  width,
  height,
  value,
  meterColor,
  innerStripColor,
  outerStripColor,
  onSliderEditStart,
  onSliderEditEnd,
  onSliderEditing,
  maxValue,
  strokeWidth,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const r = (Math.min(width, height) / 2) * 0.85;

  const [onLayout] = useComponentSize();

  const valueToDegree = useCallback(
    val => (val > 0 && maxValue > 0 ? (val / maxValue) * 360 : 0),
    [maxValue],
  );
  const degreeToValue = useCallback(
    deg => (deg > 0 ? (deg / 360) * maxValue : 0),
    [maxValue],
  );

  const cartesianToPolar = useCallback(
    (x, y) =>
      Math.round(
        Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90),
      ),
    [cx, cy],
  );
  const polarToCartesian = useCallback(
    angle => {
      const a = ((angle - 270) * Math.PI) / 180.0;
      const x = Math.round(cx + r * Math.cos(a));
      const y = Math.round(cy + r * Math.sin(a));
      return { x, y };
    },
    [cx, cy, r],
  );

  const handlePanResponderMove = useCallback(
    ({ nativeEvent: { locationY, pageX } }) => {
      const locationX = pageX - locationPageOffset;
      const val = degreeToValue(cartesianToPolar(locationX, locationY));
      onSliderEditing(val);
    },
    [cartesianToPolar, degreeToValue, onSliderEditing],
  );

  const panResponder = useCallback(
    valueOnEnd =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderGrant: ({ nativeEvent: { pageX, locationX } }) => {
          locationPageOffset = pageX - locationX;
          onSliderEditStart();
          return true;
        },
        onPanResponderRelease: () => {
          onSliderEditEnd(valueOnEnd);
          return true;
        },
      }),
    [handlePanResponderMove, onSliderEditEnd, onSliderEditStart],
  );

  const degree = valueToDegree(value);
  const startCoord = polarToCartesian(0);
  const endCoord = polarToCartesian(degree);

  return (
    <Svg onLayout={onLayout} width={width} height={height}>
      <Circle
        cx={cx}
        cy={cy}
        r={r - strokeWidth / 2}
        stroke={innerStripColor}
        strokeWidth={1}
        fill="none"
      />
      <Circle
        cx={cx}
        cy={cy}
        r={r + strokeWidth / 2}
        stroke={outerStripColor}
        strokeWidth={1}
        fill="none"
      />
      <Path
        stroke={meterColor}
        strokeWidth={strokeWidth}
        fill="none"
        d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${
          degree > 180 ? 1 : 0
        } 1 ${endCoord.x} ${endCoord.y}`}
      />
      <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
        <Circle
          cx={7.5}
          cy={7.5}
          r={10}
          fill={meterColor}
          {...panResponder(value).panHandlers}
        />
      </G>
    </Svg>
  );
};

CircularSlider.propTypes = {
  height: PropTypes.number.isRequired,
  meterColor: PropTypes.string.isRequired,
  innerStripColor: PropTypes.string.isRequired,
  outerStripColor: PropTypes.string.isRequired,
  onSliderEditStart: PropTypes.func.isRequired,
  onSliderEditEnd: PropTypes.func.isRequired,
  onSliderEditing: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
};

export default CircularSlider;
