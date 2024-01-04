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
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { RootStackParamList } from './RootNavigator';

type RootState = any;

const AppNameTitle = styled(TopTitle)`
  margin-top: 20px;
`;

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: FC<SplashProps> = ({ navigation: { navigate, replace } }) => {
  const { getAppData } = useAppData();
  const [animationFinished, setAnimationFinished] = useState(false);

  const isLoaded = useSelector((state: RootState) => state.appData.loaded);
  const accessToken = useSelector(
    (state: RootState) => state.userDetails.accessToken,
  );

  useEffect(() => {
    setTimeout(
      () => {
        if (accessToken) {
          getAppData();
        } else {
          navigate('Onboarding');
        }
      },
      config.isDev ? 1000 : 3000,
    );
  }, [accessToken, getAppData, navigate]);

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
    </Container>
  );
};

export default Splash;
