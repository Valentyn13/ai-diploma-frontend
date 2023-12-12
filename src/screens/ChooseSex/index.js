import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { SubTitle, Title, TouchableIcon } from '@common/components/Styled';
import { ProgressView } from '@react-native-community/progress-view';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from 'react-navigation-hooks';
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

const IntroTitle = styled(Title)`
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 60px;
`;

const SexChooserTitle = styled(SubTitle)`
  text-align: center;
  line-height: 19px;
`;

const SexChooserRow = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 30px;
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

const ChooseSex = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [sex, setSex] = useState();

  const onContinue = () => {
    if (sex) {
      dispatch(chooseSex({ sex }));
      navigate('PickExperience');
    } else {
      alert('אנא בחר מין');
    }
  };

  const { width } = Dimensions.get('screen');
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
        style={{ position: 'absolute', top: scale(80), alignItems: 'center' }}>
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
      </View>
      <View style={{ alignItems: 'center', width: '90%', marginBottom: 30 }}>
        <TouchableOpacity
          onPress={() => setSex('F')}
          style={{
            alignItems: 'center',
            width: '100%',
            paddingVertical: 36,
            paddingHorizontal: 20,
            backgroundColor: sex === 'F' ? '#D66366' : 'white',
            borderRadius: 12,
            height: 100,
          }}>
          <AppText
            style={{ color: sex === 'F' ? 'white' : '#D66366', fontSize: 20 }}>
            נקבה
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSex('M')}
          style={{
            alignItems: 'center',
            width: '100%',
            marginTop: scale(15),
            paddingVertical: 36,
            paddingHorizontal: 20,
            backgroundColor: sex === 'M' ? '#D66366' : 'white',
            borderRadius: 12,
            height: 100,
          }}>
          <AppText
            style={{ color: sex === 'M' ? 'white' : '#D66366', fontSize: 20 }}>
            זכר
          </AppText>
        </TouchableOpacity>
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
      <View style={{ position: 'absolute', bottom: scale(20) }}>
        <AppButton onPress={() => onContinue()}>{'המשך'}</AppButton>
      </View>
    </View>
  );

  // return (
  //   <Container>
  //     <Container flex={1.3}>
  //       <TopTitle k="appName" />
  //       <IntroTitle k="intro2" />
  //     </Container>
  //     <Container flex={1}>
  //       <BgImage name="intro2" />
  //     </Container>
  //
  //     <Container>
  //       <SexChooserTitle k="chooseSex" />
  //       <SexChooserRow>
  //         <SexChooser sex="female" onPress={() => onChooseSex('F')} />
  //         <SexChooser sex="male" onPress={() => onChooseSex('M')} />
  //       </SexChooserRow>
  //     </Container>
  //   </Container>
  // );
};

SexChooser.propTypes = {
  sex: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ChooseSex;
