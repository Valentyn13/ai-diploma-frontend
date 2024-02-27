import image from '@common/assets/images';
import AppText from '@common/components/AppText';
import Meditate from '@common/components/animation/Meditate';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import i18n from '@services/localization/i18n';
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const BgImage = styled.ImageBackground.attrs<any>(
  ({ name, isFirst }: { name: string; isFirst: boolean }) => ({
    resizeMode: isFirst ? 'cover' : 'contain',
    source: image(name),
  }),
)`
  width: 100%;
  height: 100%;
  padding-left: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-right: ${({ theme: { dimens } }) => dimens.margin}px;
`;

const ElegantText = styled(AppText)`
  color: #1f2937; /* Gray-800 for better contrast */
  text-align: center;
  margin-top: ${scale(20)}px;
`;

const Intro: FC = () => {
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'welcome' });
    uploadEvents();
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <WithSlideInX delay={300}>
          <WithFadeIn delay={300}>
            <ElegantText style={{ fontSize: scale(28), fontWeight: '700' }}>
              {i18n.t('welcomeTitle')}
            </ElegantText>
            <ElegantText style={{ fontSize: scale(20), fontWeight: '600' }}>
              {i18n.t('welcomeSubtitle')}
            </ElegantText>
          </WithFadeIn>
        </WithSlideInX>
        <WithSlideInY delay={600}>
          <WithFadeIn delay={600}>
            <ElegantText style={{ fontSize: scale(16) }}>
              {i18n.t('welcomeDescription')}
            </ElegantText>
          </WithFadeIn>
        </WithSlideInY>

        <View className="mt-4 flex-1 w-full items-center justify-center">
          <View className="w-2/3">
            <Meditate />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Intro;
