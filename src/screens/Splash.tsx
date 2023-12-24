import { Container, Icon, TopTitle } from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import { RootState } from 'path-to-your-root-reducer';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

type RootState = any;

const AppNameTitle = styled(TopTitle)`
  margin-top: 20px;
`;

interface SplashProps {
  navigation: any; // Adjust the type based on the actual navigation type
}

const Splash: React.FC<SplashProps> = () => {
  const { navigate } = useNavigation();
  const { getAppData } = useAppData();
  const dispatch = useDispatch();

  const appDataloaded = useSelector((state: RootState) => state.appData.loaded);
  const accessToken = useSelector(
    (state: RootState) => state.userDetails.accessToken,
  );

  const fadeAnim = useSharedValue(0);
  const fadeAnim2 = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const fadeInText2 = useSharedValue(0);

  useEffect(() => {
    const fadeInLogo = () => {
      fadeAnim.value = withTiming(1, {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      });
    };

    const fadeInText = () => {
      fadeAnim2.value = withDelay(
        600,
        withTiming(1, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
      );
    };

    const slideUpAndShrink = () => {
      translateY.value = withDelay(
        1200,
        withTiming(-100, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
      );

      scale.value = withDelay(
        1200,
        withTiming(0.8, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
      );
    };

    const fadeInText2Animation = () => {
      fadeInText2.value = withSequence(
        withDelay(1800, withTiming(1, { duration: 600 })),
      );
    };

    const timer = setTimeout(() => {
      if (accessToken) {
        getAppData();
      } else {
        navigate('IntroScreens');
      }
    }, 2000);

    fadeInLogo();
    fadeInText();

    // Delay slideUpAndShrink animation by 1200ms (600ms for each fadeIn animation)
    setTimeout(() => {
      slideUpAndShrink();
      fadeInText2Animation();
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [
    accessToken,
    getAppData,
    fadeAnim,
    navigate,
    fadeAnim2,
    translateY,
    scale,
    fadeInText2,
  ]);

  useEffect(() => {
    if (appDataloaded) {
      navigate('Main');
    }
  }, [appDataloaded, dispatch, navigate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim2.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  const fadeInText2Style = useAnimatedStyle(() => {
    return {
      opacity: fadeInText2.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Container>
      <Animated.View style={[animatedStyle]}>
        <Icon name="logo" size={100} />
      </Animated.View>
      <Animated.View style={[animatedStyle2]}>
        <AppNameTitle k="appName" />
      </Animated.View>
      <Animated.View style={[fadeInText2Style]}>
        <TopTitle>Take a deep breath</TopTitle>
      </Animated.View>
    </Container>
  );
};

export default Splash;
