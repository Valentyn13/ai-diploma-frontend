import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import { useNavigation } from '@react-navigation/native';
import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { Dimensions, Image, View } from 'react-native';
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

const ElegantView = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f3f4f6; /* Soft gray background */
  padding: ${scale(35)}px;
`;

const ElegantText = styled(AppText)`
  color: #1f2937; /* Gray-800 for better contrast */
  text-align: center;
  margin-top: ${scale(20)}px;
`;

const ElegantButton = styled(AppButton)`
  padding: ${scale(12)}px ${scale(24)}px;
  border-radius: ${scale(8)}px; /* Rounded corners */
  margin-top: ${scale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62px;
  elevation: 4;
`;

const IntroSleep: FC = () => {
  const { navigate } = useNavigation<any>();
  const { width } = Dimensions.get('screen');

  return (
    <ElegantView>
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
      <Image
        style={{ position: 'absolute', bottom: 0, width }}
        source={image('ellipse')}
      />
      <Image
        style={{ position: 'absolute', bottom: scale(120), height: scale(260) }}
        source={image('bg_1')}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={{ position: 'absolute', bottom: scale(40) }}>
        <ElegantButton
          onPress={() => navigate('Onboarding', { screen: 'IntroStudy' })}>
          {'המשך'}
        </ElegantButton>
      </View>
    </ElegantView>
  );
};

export default IntroSleep;
