import Gradient from '@common/components/Gradient';
import Logo from '@common/components/Logo';
import WithPulse from '@common/components/transitions/WIthPulse';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import config from '@common/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import { useIntro } from '@services/hooks/useIntro';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from './RootNavigator';

type RootState = any;

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: FC<SplashProps> = ({ navigation: { navigate, replace } }) => {
  const { isFirstTimeUser } = useIntro();
  const { getAppData } = useAppData();
  const [animationFinished, setAnimationFinished] = useState(false);
  const { logEvent, uploadEvents } = useAmplitude();

  const isLoaded = useSelector((state: RootState) => state.appData.loaded);
  const accessToken = useSelector(
    (state: RootState) => state.userDetails.accessToken,
  );

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (accessToken) {
          getAppData();
        } else if (isFirstTimeUser) {
          logEvent(AMPLITUDE_EVENTS.ONBOARDING_START);
          uploadEvents();
          replace('Onboarding');
        } else {
          replace('Auth');
        }
      },
      config.isDev ? 1000 : 3000,
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, getAppData, isFirstTimeUser, navigate]);

  useEffect(() => {
    if (isLoaded && animationFinished) {
      replace('Main');
    }
  }, [isLoaded, animationFinished, replace]);

  useEffect(() => {
    const simulateAnimationEnd = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnimationFinished(true);
    };

    simulateAnimationEnd();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Gradient colors={['#4F84D5', '#A9B8E8', '#FFF8EE']} angle={0} />
      <WithFadeIn delay={0} duration={1000}>
        <WithPulse scaleMin={0.9} scaleMax={1.2} duration={2000}>
          <Logo transform={[{ rotate: '-10deg' }]} />
        </WithPulse>
      </WithFadeIn>
    </View>
  );
};

export default Splash;
