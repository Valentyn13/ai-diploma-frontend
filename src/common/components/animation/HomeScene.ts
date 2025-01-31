import { withDelay, withTiming } from 'react-native-reanimated';

const HERO_ANIMATION_DURATION = 800;
const BIRDS_ANIMATION_DURATION = 770;

const DELAY_BEFORE_ANIMATION = 100;

const cloudOneRightGlide = values => {
  'worklet';

  const animations = {
    transform: [
      {
        translateX: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming(0, { duration: HERO_ANIMATION_DURATION }),
        ),
      },
    ],
  };

  const initialValues = {
    transform: [{ translateX: -50 }],
  };

  return {
    initialValues,
    animations,
  };
};

const cloudTwoRightGlide = values => {
  'worklet';

  const animations = {
    transform: [
      {
        translateX: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming(0, { duration: HERO_ANIMATION_DURATION }),
        ),
      },
    ],
  };

  const initialValues = {
    transform: [{ translateX: -55 }],
  };

  return {
    initialValues,
    animations,
  };
};

const cloudOneOneOpacityAppear = values => {
  'worklet';

  const animations = {
    opacity: withDelay(
      DELAY_BEFORE_ANIMATION,
      withTiming(1, { duration: HERO_ANIMATION_DURATION }),
    ),
    transform: [
      {
        translateX: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming(0, { duration: HERO_ANIMATION_DURATION }),
        ),
      },
      {
        translateY: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming(0, { duration: HERO_ANIMATION_DURATION }),
        ),
      },
    ],
  };

  const initialValues = {
    opacity: 0,
    transform: [{ translateX: -30 }, { translateY: 20 }],
  };

  return {
    initialValues,
    animations,
  };
};

const sunGlideToTop = values => {
  'worklet';

  const animations = {
    transform: [
      {
        translateY: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming(0, { duration: HERO_ANIMATION_DURATION }),
        ),
      },
    ],
  };

  const initialValues = {
    transform: [{ translateY: 50 }],
  };

  return {
    initialValues,
    animations,
  };
};

const birdRotateToLeftAndScaleToOne = values => {
  'worklet';

  const animations = {
    transform: [
      {
        rotate: withDelay(
          DELAY_BEFORE_ANIMATION,
          withTiming('10deg', { duration: BIRDS_ANIMATION_DURATION }),
        ),
      },
    ],
  };

  const initialValues = {
    transform: [{ rotate: '25deg' }],
  };

  return {
    initialValues,
    animations,
  };
};

export {
  cloudOneRightGlide,
  cloudTwoRightGlide,
  cloudOneOneOpacityAppear,
  sunGlideToTop,
  birdRotateToLeftAndScaleToOne,
};
