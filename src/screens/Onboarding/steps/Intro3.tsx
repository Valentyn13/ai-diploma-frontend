import image from '@common/assets/images';
import AppText from '@common/components/AppText';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import React, { useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components';

export const BgImage = styled.ImageBackground.attrs(({ name, isFirst }) => ({
  resizeMode: isFirst ? 'cover' : 'contain',
  source: image(name),
}))`
  width: 100%;
  height: 100%;
  padding-left: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-right: ${({ theme: { dimens } }) => dimens.margin}px;
`;

const IntroRelax = () => {
  const { width } = Dimensions.get('screen');
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'relax' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: scale(40),
        }}>
        <Image
          style={{
            flex: 1,
            position: 'absolute',
            width,
            left: 5,
            right: 0,
            bottom: 0,
            top: 0,
          }}
          source={image('bg_3')}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <AppText
          style={{
            fontWeight: '500',
            color: '#160F29',
            textAlign: 'center',
            fontSize: scale(24),
            marginTop: scale(360),
          }}>
          {'לנוח, להירגע ולהירדם מ-ה-ר!'}
        </AppText>
        <AppText
          style={{
            color: '#000000',
            textAlign: 'center',
            fontSize: scale(16),
            marginTop: scale(10),
          }}>
          {
            'בעזרת מיינדפולנס תוכלו להירדם\nמהר ועמוק יותר.\n\nאם אתם מתקשים להירדם,\nעברו לאיזור המתאים באפליקציה,\nנסו את התרגולים וראו בעצמכם.'
          }
        </AppText>
      </View>
    </SafeAreaView>
  );
};

export default IntroRelax;
