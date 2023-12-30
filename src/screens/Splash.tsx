import { Container, Icon, TopTitle } from '@common/components/Styled';
import WithPulse from '@common/components/transitions/WIthPulse';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithRotate from '@common/components/transitions/WithRotate';
import WithScale from '@common/components/transitions/WithScale';
import WithTranslateY from '@common/components/transitions/WithTranslateY';
import config from '@common/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAppData from '@services/hooks/useAppData';
import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { RootStackParamList } from './RootNavigator';

type RootState = any;

const AppNameTitle = styled(TopTitle)`
  margin-top: 20px;
`;

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: FC<SplashProps> = ({ navigation: { replace } }) => {
  const { getAppData } = useAppData();
  const [animationFinished, setAnimationFinished] = useState(false);

  const isLoaded = useSelector((state: RootState) => state.appData.loaded);
  const accessToken = useSelector(
    (state: RootState) => state.userDetails.accessToken,
  );

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (accessToken) {
          getAppData();
        } else {
          replace(config.isDev ? 'Auth' : 'Onboarding');
        }
      },
      config.isDev ? 1000 : 3000,
    );

    return () => clearTimeout(timer);
  }, [accessToken, getAppData, replace]);

  useEffect(() => {
    if (isLoaded && animationFinished) {
      replace('Main');
    }
  }, [isLoaded, animationFinished, replace]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setAnimationFinished(true);
      },
      config.isDev ? 0 : 3000,
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <WithFadeIn delay={0} duration={500}>
        <WithPulse scaleMin={0.9} scaleMax={1.1} duration={2000}>
          <WithTranslateY value={-50} duration={700} delay={1000}>
            <WithRotate degrees={10} duration={600}>
              <WithScale scaleValue={0.9} duration={550}>
                <Icon name="logo" size={100} />
              </WithScale>
            </WithRotate>
          </WithTranslateY>
        </WithPulse>
      </WithFadeIn>

      <WithFadeIn delay={500} duration={500}>
        <WithTranslateY value={-50} duration={700} delay={1000}>
          <WithScale scaleValue={0.9} duration={550}>
            <AppNameTitle
              className="text-xl font-semibold text-gray-800"
              k="appName"
            />
          </WithScale>
        </WithTranslateY>
      </WithFadeIn>

      <WithFadeIn delay={2000} duration={500}>
        <Text className="text-xl text-gray-800">קחו נשימה</Text>
      </WithFadeIn>
    </Container>
  );
};

export default Splash;
