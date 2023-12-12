import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Container, Title, TopTitle } from '@common/components/Styled';
import React from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from 'react-navigation-hooks';
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

const IntroTitle = styled(Title)`
  margin-top: 30px;
  margin-left: 48px;
  margin-right: 48px;
`;

const AppTitle = styled(TopTitle)``;

const TopContainer = styled(Container)`
  justify-content: flex-end;
`;

// const IntroRelax = () => {
//     const {navigate} = useNavigation();
//
//     return (
//         <Container>
//             <BgImage name="onboardRelax" isFirst>
//                 <Container flex={0.5} />
//                 <TopContainer flex={1.3}>
//                     <AppTitle k="appName" />
//                     <IntroTitle k="introRelax" />
//                 </TopContainer>
//                 <Container flex={0.5}>
//                     <Button title="next" onPress={() => navigate('ChooseSex')} big bgColor="briquette" />
//                 </Container>
//             </BgImage>
//         </Container>
//     );
// };

const IntroRelax = () => {
  const { navigate } = useNavigation();

  const { width } = Dimensions.get('screen');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcf2e3' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fcf2e3',
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
          black
          style={{
            color: '#160F29',
            textAlign: 'center',
            fontSize: scale(24),
            marginTop: scale(360),
          }}>
          {'לנוח, להירגע ולהירדם מ-ה-ר!'}
        </AppText>
        <AppText
          style={{
            // color: '#160F29',
            color: '#000000',

            textAlign: 'center',
            fontSize: scale(16),
            marginTop: scale(10),
          }}>
          {
            'בעזרת מיינדפולנס תוכלו להירדם\nמהר ועמוק יותר.\n\nאם אתם מתקשים להירדם,\nעברו לאיזור המתאים באפליקציה,\nנסו את התרגולים וראו בעצמכם.'
          }
        </AppText>
        <View style={{ position: 'absolute', bottom: scale(20) }}>
          <AppButton onPress={() => navigate('ChooseSex')}>{'המשך'}</AppButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IntroRelax;
