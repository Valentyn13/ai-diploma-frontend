import image from '@common/assets/images';
import Button from '@common/components/Button';
import {
  Container,
  SubTitle,
  Title,
  TopTitle,
  TouchableIcon,
} from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
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
const Intro = () => {
  const { navigate } = useNavigation();
  // console.log('LOgout intro');

  return (
    <Container>
      <Container flex={1}>
        <TopTitle k="appName" />
        <IntroTitle k="intro1" />
      </Container>
      <Container flex={1.2}>
        <BgImage name="intro1">
          <Button title="next" onPress={() => navigate('IntroSleep')} big />
        </BgImage>
      </Container>
    </Container>
  );
};

SexChooser.propTypes = {
  sex: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Intro;
