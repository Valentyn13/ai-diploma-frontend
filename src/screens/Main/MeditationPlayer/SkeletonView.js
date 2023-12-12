import {
  BoldTitle,
  MeditationContainer,
  SubTitle,
  TopTitle,
  TouchableIcon,
} from '@common/components/Styled';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Video from 'react-native-video';
import styled from 'styled-components';

import CircularPlayer from './CircularPlayer';

const SkeletonView = () => {
  const TopBottomIconsWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;
  const Header = styled(TopBottomIconsWrapper)`
    margin-top: ${DeviceInfo.hasNotch() ? 20 : 20};
  `;

  const Footer = styled(TopBottomIconsWrapper)`
    margin-bottom: ${DeviceInfo.hasNotch() ? 20 : 0};
  `;

  const IconWrapper = styled.View`
    margin: ${({ theme: { dimens } }) => dimens.margin}px;
  `;

  const HeaderTitle = styled(TopTitle)`
    flex: 1;
    text-align: center;
  `;

  const ButtonsContainer = styled(MeditationContainer)`
    justify-content: space-between;
  `;

  const ButtonsInnerContainer = styled(MeditationContainer)`
    justify-content: flex-start;
  `;

  const StartHereTitle = styled(BoldTitle)`
    margin-top: 10px;
  `;

  const InstructorName = styled(SubTitle)`
    margin-bottom: 10px;
  `;

  const VideoPlayer = styled(Video).attrs(() => ({
    resizeMode: 'cover',
    repeat: true,
  }))`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  const AudioPlayer = styled(Video).attrs(() => ({}))`
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
  `;

  let whiteColor = '#fff';
  return (
    <SkeletonPlaceholder>
      <MeditationContainer>
        <View
          style={{
            borderWidth: 0,
            height: 0,
            width: 100,
            backgroundColor: 'red',
          }}
        />

        <Header>
          <IconWrapper>
            <TouchableIcon opacity={0.5} name="music" color={whiteColor} />
          </IconWrapper>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              position: 'absolute',
              top: 70,
            }}>
            <StartHereTitle
              style={{
                textAlign: 'left',
                letterSpacing: 0.58,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                color: 'white',
                opacity: 0.5,
              }}
            />
            <StartHereTitle
              style={{
                textAlign: 'right',
                letterSpacing: 0.68,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                color: 'white',
                marginTop: 10,
                opacity: 0.5,
              }}
              t={'צלילי אוקיינוס'}
            />
          </View>

          <IconWrapper>
            <TouchableIcon name="close" color={whiteColor} />
          </IconWrapper>
        </Header>
        <MeditationContainer flex={1} />
        <ButtonsContainer flex={1.1}>
          <ButtonsInnerContainer>
            <CircularPlayer />
            <StartHereTitle color={whiteColor} t={'ffff'} />
            <TouchableOpacity
              onPress={() => navigate('MeditationInfo')}
              style={{ alignSelf: 'center' }}>
              <InstructorName
                t={'fffff'}
                color={whiteColor}
                style={{ textAlign: 'center' }}
              />
              <IconWrapper style={{ opacity: 0.7 }} />
            </TouchableOpacity>
          </ButtonsInnerContainer>

          <Footer>
            <IconWrapper style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={{ alignSelf: 'flex-end' }} />
            </IconWrapper>
          </Footer>
        </ButtonsContainer>
      </MeditationContainer>
    </SkeletonPlaceholder>
  );
};

export default SkeletonView;
