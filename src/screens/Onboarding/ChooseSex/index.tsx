import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { SubTitle, TouchableIcon } from '@common/components/Styled';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import { ProgressView } from '@react-native-community/progress-view';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useCache from '@services/hooks/useCache';
import { INTRO_METADATA_KEY, IntroMetadata } from '@services/hooks/useIntro';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { chooseSex } from 'store/actions';
import styled from 'styled-components';

export const BgImage = styled.ImageBackground.attrs(({ name, isFirst }) => ({
  resizeMode: isFirst ? 'cover' : 'contain',
  source: image(name),
}))`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-left: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-right: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-bottom: 30px;
`;

const SexChooserContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const SexTitle = styled(SubTitle)`
  margin-top: 10px;
`;

const SexChooser = ({ sex, onPress }) => (
  <SexChooserContainer>
    <TouchableIcon name={sex} size={44} {...{ onPress }} />
    <SexTitle k={sex} />
  </SexChooserContainer>
);

const ChooseSex = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const [sex, setSex] = useState();
  const [value, setValue] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const { width } = Dimensions.get('screen');
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'gender' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onContinue = () => {
    if (sex) {
      dispatch(chooseSex({ sex }));
      setValue({
        ...value,
        sex,
      });
      navigate('Onboarding', { screen: 'PickExperience' });
    } else {
      alert('אנא בחר מין');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{ position: 'absolute', top: 0, width }}
        source={image('gender_bg')}
      />

      <View
        style={{
          position: 'absolute',
          top: scale(80),
          alignItems: 'center',
        }}>
        <WithSlideInX delay={300}>
          <WithFadeIn delay={300}>
            <AppText
              black
              style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
              {'עוד רגע מתחילים'}
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 6,
                textAlign: 'center',
                color: '#000',
              }}>
              {'לפני הכניסה לאפליקציה,\nנשמח לדעת איך לפנות אלייך?'}
            </AppText>
          </WithFadeIn>
        </WithSlideInX>
      </View>

      <View style={{ alignItems: 'center', width: '90%', marginBottom: 30 }}>
        <WithSlideInY delay={600}>
          <WithFadeIn delay={600}>
            <TouchableOpacity
              onPress={() => setSex('F')}
              style={{
                alignItems: 'center',
                width: width - 40,
                paddingVertical: 36,
                paddingHorizontal: 20,
                backgroundColor: sex === 'F' ? '#D66366' : 'white',
                borderRadius: 12,
                height: 100,
              }}>
              <AppText
                style={{
                  color: sex === 'F' ? 'white' : '#D66366',
                  fontSize: 20,
                }}>
                נקבה
              </AppText>
            </TouchableOpacity>
          </WithFadeIn>
        </WithSlideInY>
        <WithSlideInY delay={700}>
          <WithFadeIn delay={700}>
            <TouchableOpacity
              onPress={() => setSex('M')}
              style={{
                alignItems: 'center',
                width: width - 40,
                marginTop: scale(15),
                paddingVertical: 36,
                paddingHorizontal: 20,
                backgroundColor: sex === 'M' ? '#D66366' : 'white',
                borderRadius: 12,
                height: 100,
              }}>
              <AppText
                style={{
                  color: sex === 'M' ? 'white' : '#D66366',
                  fontSize: 20,
                }}>
                זכר
              </AppText>
            </TouchableOpacity>
          </WithFadeIn>
        </WithSlideInY>
      </View>
      <View
        style={{
          position: 'absolute',
          left: scale(20),
          bottom: scale(65),
          height: scale(200),
          width: scale(160),
        }}>
        <Image
          style={{ height: '100%' }}
          source={image('plant')}
          resizeMethod="resize"
          resizeMode="center"
        />
      </View>

      <View
        style={{
          width: '80%',
          bottom: scale(66),
          position: 'absolute',
          height: 20,
          transform: [{ rotateY: Platform.OS === 'ios' ? '0deg' : '180deg' }],
        }}>
        <ProgressView
          progressViewStyle="default"
          progressTintColor="black"
          trackTintColor="gray"
          progress={0.3}
        />
      </View>
      <View
        className="w-full"
        style={{ position: 'absolute', bottom: 0, padding: scale(40) }}>
        <AppButton onPress={() => onContinue()}>{'המשך'}</AppButton>
      </View>
    </View>
  );
};

SexChooser.propTypes = {
  sex: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ChooseSex;
