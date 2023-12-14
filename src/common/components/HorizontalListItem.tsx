/* eslint-disable react-native/no-inline-styles */
import { categoryImage } from '@common/assets/images';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import usePurchases from '@services/hooks/usePurchases';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/meditationTime';
import React, { useCallback, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { meditationInstructor } from 'store/selectors';
import styled from 'styled-components/native';

import { BoldSubTitle, CenteredView, SubTitle } from './Styled';

interface MeditationIconsContentProps {
  categoryTitle: string;
  instructorName: string;
}

const MeditationIconsContent: React.FC<MeditationIconsContentProps> = ({
  categoryTitle,
  instructorName,
}) => {
  return (
    <MeditationIconsContentWrapper>
      <IconWrapperContainer>
        <SubTitle style={{ marginLeft: 4 }} color="#fff" t={categoryTitle} />
      </IconWrapperContainer>
      <IconWrapperContainer>
        <IconWrapper>
          <Icon color="#fff" name="user" size={10} />
        </IconWrapper>
        <SubTitle
          style={{ marginLeft: 4, marginTop: 2 }}
          color="#fff"
          t={instructorName ?? ''}
        />
      </IconWrapperContainer>
    </MeditationIconsContentWrapper>
  );
};

interface HorizontalListItemProps {
  item: {
    id: string;
    name: string;
    url?: string;
    duration?: number;
    categoryName: string;
    animation?: string;
    thumbnail?: string;
    isCategoryLocked: boolean;
    categoryTitle: string;
  };
  index: number;
  big?: boolean;
  height?: string;
}

const HorizontalListItem: React.FC<HorizontalListItemProps> = ({
  item: {
    id,
    name,
    url,
    duration,
    categoryName,
    animation,
    thumbnail,
    isCategoryLocked,
    categoryTitle,
  },
  index,
  big,
  height,
}) => {
  const { navigate } = useNavigation();
  const amplitudeInstance = useAmplitude();
  const instructor = useSelector(state => meditationInstructor(state, id));

  const { hasPremium, setPurchaserIdentity } = usePurchases();

  useEffect(() => {
    setPurchaserIdentity();
  }, [setPurchaserIdentity]);

  const navigateToMeditation = useCallback(() => {
    if (!hasPremium && isCategoryLocked) {
      navigate('Subscribe2', { item: { name } });
    } else {
      amplitudeInstance.logEvent('MEDITATION_CLICKED', { categoryName });
      amplitudeInstance.logEvent('MEDITATION_PLAY', { categoryName });
      logEvent('MEDITATION_CLICKED', { categoryName });
      logEvent('MEDITATION_PLAY', { categoryName });
      amplitudeInstance.uploadEvents();
      navigate('MeditationPlayer', {
        item: { id, name, categoryName, url, animation },
        index,
      });
    }
  }, [
    hasPremium,
    isCategoryLocked,
    navigate,
    name,
    amplitudeInstance,
    categoryName,
    id,
    url,
    animation,
    index,
  ]);

  const src = categoryImage(categoryName, index, thumbnail);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
      }}>
      <Item
        onPress={navigateToMeditation}
        big={big}
        height={height}
        key={id.toString() + index.toString()}>
        <ImageContainer source={src}>
          {!hasPremium && isCategoryLocked && (
            <Image
              source={require('@common/assets/images/padlock.png')}
              style={{
                width: 40,
                height: 40,
                opacity: 0.2,
                alignSelf: 'center',
              }}
            />
          )}
          <TimeLabel height={height}>
            <IconWrapper>
              <Icon name="clock" size={8} color="#fff" />
            </IconWrapper>
            <SubTitle
              style={{ marginLeft: 4 }}
              color="#fff"
              t={`${meditationTime(duration, true)}`}
            />
          </TimeLabel>
        </ImageContainer>
        <IconsContainer>
          <BoldSubTitle color="#fff" t={name} style={{ flex: 1 }} />
          <MeditationIconsContent
            categoryTitle={categoryTitle}
            instructorName={instructor?.name ?? ''}
          />
        </IconsContainer>
      </Item>
    </View>
  );
};

interface StyledItemProps {
  big?: boolean;
  height?: string;
}

const Item = styled(TouchableOpacity)<StyledItemProps>`
  flex-direction: column;
  width: ${({ theme }) => theme.dimens.winWidth / 2.4};
  height: ${({ height }) =>
    height === 'small' ? 120 : height === 'large' ? 280 : 160};
  margin: 5px;
  border-radius: 12px;
  overflow: hidden;
`;

const ImageContainer = styled.ImageBackground.attrs(() => ({
  resizeMode: 'cover',
}))`
  flex: 1;
  background-color: green;
  justify-content: center;
`;

const IconsContainer = styled.View`
  height: 50px;
  background-color: ${({ theme: { colors } }) => colors.darkColor};
  flex-direction: column;
  align-items: flex-start;
  padding-left: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const IconWrapper = styled(CenteredView)``;

const IconWrapperContainer = styled(CenteredView)`
  flex-direction: row;
  margin-top: 5px;
  margin-right: 8px;
  align-items: center;
`;

const MeditationIconsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TimeLabel = styled.View<{ height?: string }>`
  flex-direction: row;
  position: absolute;
  top: ${({ height }) => (height === 'small' ? 10 : 20)}px;
  left: 0;
  height: 15px;
  padding: 0 6px 0 4px;
  background-color: ${({ theme: { colors } }) => colors.darkColor};
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export default HorizontalListItem;
