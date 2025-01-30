import image from '@common/assets/images';
import AppText from '@common/components/AppText';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import Theme from '@common/theme';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import React, { useEffect } from 'react';
import { Image, Platform, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components';

export const BgImage = styled.ImageBackground.attrs(({ name, isFirst }) => ({
  resizeMode: isFirst ? 'cover' : 'contain',
  source: image(name),
}))`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const IntroStudy = () => {
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'impact' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Theme.colors.bgColor,
        padding: scale(40),
      }}>
      <WithSlideInX delay={300}>
        <WithFadeIn delay={300}>
          <AppText
            style={{
              fontWeight: '500',
              color: '#160F29',
              fontSize: scale(23),
              marginTop: Platform.OS === 'ios' ? scale(70) : scale(60),
            }}>
            {'5 דקות ביום, זה כל הסיפור'}
          </AppText>
        </WithFadeIn>
      </WithSlideInX>
      <WithSlideInY delay={600}>
        <WithFadeIn delay={600}>
          <AppText
            style={{
              color: '#000000',
              textAlign: 'center',
              fontSize: scale(15),
              marginTop: scale(20),
            }}>
            {
              'כל כך פשוט וקל ליצור שינוי משמעותי\nבחיים, רק 5 דקות ביום ותוכלו להרגיש\nאת השפעת המיינדפולנס על הגוף והנפש.\n\nזמן קצר... אפקט גדול!'
            }
          </AppText>
        </WithFadeIn>
      </WithSlideInY>
      <Image
        style={{
          position: 'absolute',
          width: scale(300),
          resizeMode: 'contain',
          height: scale(280),
          bottom: scale(100),
          alignSelf: 'center',
        }}
        source={image('bg_2')}
      />
    </View>
  );
};

export default IntroStudy;
