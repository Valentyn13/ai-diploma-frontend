import { Container, Icon, TopTitle } from '@common/components/Styled';
import WithPulse from '@common/components/transitions/WIthPulse';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithRotate from '@common/components/transitions/WithRotate';
import WithScale from '@common/components/transitions/WithScale';
import WithTranslateY from '@common/components/transitions/WithTranslateY';
import { useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import { RootState } from 'path-to-your-root-reducer';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

type RootState = any;

const AppNameTitle = styled(TopTitle)`
  margin-top: 20px;
`;

interface SplashProps {
  navigation: any;
}

const Splash: React.FC<SplashProps> = () => {
  const { navigate } = useNavigation();
  const { getAppData } = useAppData();
  const [animationFinished, setAnimationFinished] = useState(false);

  const isLoaded = useSelector((state: RootState) => state.appData.loaded);
  const accessToken = useSelector(
    (state: RootState) => state.userDetails.accessToken,
  );

  // Trigger getAppData or navigate to IntroScreens based on accessToken
  useEffect(() => {
    setTimeout(() => {
      if (accessToken) {
        getAppData();
      } else {
        navigate('IntroScreens');
      }
    }, 3000);
  }, [accessToken, getAppData, navigate]);

  // Navigate to 'Main' when both isLoaded and animationFinished are true
  useEffect(() => {
    if (isLoaded && animationFinished) {
      navigate('Main');
    }
  }, [isLoaded, animationFinished, navigate]);

  // Simulate animation completion after 3000ms
  useEffect(() => {
    const simulateAnimationEnd = async () => {
      // Simulate some async task like fetching data or waiting for animation
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

      <WithFadeIn delay={1000} duration={500}>
        <WithScale delay={1000} scaleValue={0.9} duration={550}>
          <Text className="text-xl font-medium text-gray-800">קחו נשימה</Text>
        </WithScale>
      </WithFadeIn>
    </Container>
  );
};

export default Splash;
