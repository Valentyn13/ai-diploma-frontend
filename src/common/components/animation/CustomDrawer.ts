import { Dimensions } from 'react-native';
import { withTiming } from 'react-native-reanimated';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const bgDrawerExiting = values => {
  'worklet';
  const animations = {
    transform: [{ translateX: withTiming(WINDOW_WIDTH, { duration: 150 }) }],
    opacity: withTiming(0, { duration: 250 }),
  };
  const initialValues = {
    transform: [{ translateX: 0 }],
    opacity: 1,
  };

  return {
    initialValues,
    animations,
  };
};
