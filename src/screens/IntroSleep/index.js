import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Container, Title, TopTitle } from '@common/components/Styled';
import React from 'react';
import { Dimensions, Image, Platform, View } from 'react-native';
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
  margin-left: 60px;
  margin-right: 60px;
  color: ${({ theme: { colors } }) => colors.titleColor};
`;

const AppTitle = styled(TopTitle)`
  color: ${({ theme: { colors } }) => colors.titleColor};
`;

const TopContainer = styled(Container)`
  justify-content: flex-start;
`;

// const IntroSleep = () => {
//   const {navigate} = useNavigation();
//
//
//   return (
//     <Container>
//       <BgImage name="onboardSleep" isFirst>
//         <Container flex={0.5} />
//         <TopContainer flex={5}>
//           <AppTitle k="appName" />
//           <IntroTitle k="introSleep" />
//         </TopContainer>
//         <Container flex={1}>
//           <Button title="next" onPress={() => navigate('IntroStudy')} big bgColor="briquette" />
//         </Container>
//       </BgImage>
//     </Container>
//   );
// };

const IntroSleep = () => {
  const { navigate } = useNavigation();
  const { width } = Dimensions.get('screen');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcf2e3',
        padding: scale(35),
      }}>
      <AppText
        black
        style={{
          color: '#160F29',
          fontSize: 28,
          fontWeight: '400',
          marginTop: Platform.OS === 'ios' ? scale(40) : scale(60),
        }}>
        היי, ברוכים הבאים לרגע
      </AppText>
      <AppText
        bold
        style={{
          color: '#160F29',
          textAlign: 'center',
          fontSize: scale(20),
          fontWeight: '400',
        }}>
        {'אפליקצית המיינדפולנס\nהראשונה בעברית'}
      </AppText>
      <AppText
        style={{
          // color: '#160F29',
          color: '#000000',
          textAlign: 'center',
          fontSize: scale(16),
          marginTop: scale(20),
        }}>
        {
          'עוד רגע ותוכלו להתחיל להתחבר לעצמכם\nלשפר את רמת הקשב והריכוז,\nלהירדם מהר יותר בלילה\nולהפחית לחצים וחרדות שמלווים\nאת כולנו בחיי היום-יום.'
        }
      </AppText>
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
        <AppButton onPress={() => navigate('IntroStudy')}>{'המשך'}</AppButton>
      </View>
    </View>
  );
};

export default IntroSleep;
