import { useEffect } from 'react';
import {
  WithTimingConfig,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const bin = (value: boolean): 0 | 1 => {
  'worklet';
  return value ? 1 : 0;
};

export const useTiming = (
  state: boolean | number,
  config?: WithTimingConfig,
) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};
