import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Title } from '@common/components/Styled';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import React from 'react';
import { Dimensions, Image, Platform, View } from 'react-native';
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

const IntroTitle = styled(Title)`
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 60px;
  margin-bottom: 60px;
`;

const ButtonContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  flex: 0.5;
  align-self: stretch;
`;

const IntroStudy = ({ navigation: { navigate } }) => {
  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcf2e3',
        padding: scale(40),
      }}>
      <WithSlideInX delay={300}>
        <WithFadeIn delay={300}>
          <AppText
            black
            style={{
              color: '#160F29',
              fontSize: scale(25),
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
              // color: '#160F29',
              color: '#000000',
              textAlign: 'center',
              fontSize: scale(16),
              marginTop: scale(20),
            }}>
            {
              'כל כך פשוט וקל ליצור שינוי משמעותי\nבחיים, רק 5 דקות ביום ותוכלו להרגיש\nאת השפעת המיינדפולנס על הגוף והנפש.\n\nזמן קצר... אפקט גדול!'
            }
          </AppText>
        </WithFadeIn>
      </WithSlideInY>
      <Image
        style={{ position: 'absolute', bottom: 0, width }}
        source={image('ellipse')}
      />
      <Image
        style={{
          position: 'absolute',
          right: scale(60),
          width: scale(300),
          resizeMode: 'contain',
          height: scale(280),
          bottom: scale(100),
        }}
        source={image('bg_2')}
      />
      <View style={{ position: 'absolute', bottom: scale(40) }}>
        <AppButton
          onPress={() => navigate('Onboarding', { screen: 'IntroRelax' })}>
          {'המשך'}
        </AppButton>
      </View>
    </View>
  );
};

export default IntroStudy;
