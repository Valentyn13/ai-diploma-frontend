import Gradient from '@common/components/Gradient';
import { Icon } from '@common/components/Styled';
import WithPulse from '@common/components/transitions/WIthPulse';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithRotate from '@common/components/transitions/WithRotate';
import WithScale from '@common/components/transitions/WithScale';
import WithTranslateY from '@common/components/transitions/WithTranslateY';
import config from '@common/config';
import theme from '@common/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useAppData from '@services/hooks/useAppData';
import { useIntro } from '@services/hooks/useIntro';
import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
      <Gradient colors={['#6190E8', '#A395D1', '#FFEFD7']} />
      <WithFadeIn delay={0} duration={500}>
        <WithPulse scaleMin={0.9} scaleMax={1.1} duration={2000}>
          <WithTranslateY value={-50} duration={700} delay={1000}>
            <WithRotate degrees={10} duration={600}>
              <WithScale scaleValue={0.9} duration={550}>
                <WithRotate degrees={-20} duration={600}>
                  <Icon color="white" name="logo" size={100} />
                </WithRotate>
              </WithScale>
            </WithRotate>
          </WithTranslateY>
        </WithPulse>
      </WithFadeIn>

      <WithFadeIn delay={500} duration={500}>
        <WithTranslateY value={-50} duration={700} delay={1000}>
          <WithScale scaleValue={0.9} duration={550}>
            <Text
              style={{
                fontFamily: theme.fonts.regular,
              }}
              className="mt-2 text-center text-2xl text-white">
              רגע
            </Text>
          </WithScale>
        </WithTranslateY>
      </WithFadeIn>
    </View>
  );
};

export default Splash;
