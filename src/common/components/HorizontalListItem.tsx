/* eslint-disable react-native/no-inline-styles */
import { categoryImage } from '@common/assets/images';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/meditationTime';
import React, { memo, useCallback, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { meditationInstructor } from 'store/selectors';
import styled from 'styled-components/native';

import { BoldSubTitle, SubTitle } from './Styled';
import usePurchases from '@services/hooks/usePurchases';

interface MeditationIconsContentProps {
  categoryTitle: string;
  instructorName: string;
}

const MeditationIconsContent: React.FC<MeditationIconsContentProps> = ({
  categoryTitle,
  instructorName,
}) => {
  return (
    <View className="flex-row">
      <SubTitle className="mr-2" color="#fff" t={categoryTitle} />
      <Icon
        style={{
          marginTop: 2,
        }}
        color="#fff"
        name="user"
        size={10}
      />
      <SubTitle
        className="ml-1 mt-[3px]"
        color="#fff"
        t={instructorName ?? ''}
      />
    </View>
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

const HorizontalListItem: React.FC<HorizontalListItemProps> = memo(
  ({
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
        // @ts-ignore TODO: fix this
        navigate('Subscribe2', { item: { name } });
      } else {
        amplitudeInstance.logEvent('MEDITATION_CLICKED');
        amplitudeInstance.logEvent('MEDITATION_PLAY');
        logEvent('MEDITATION_CLICKED', { categoryName });
        logEvent('MEDITATION_PLAY', { categoryName });
        amplitudeInstance.uploadEvents();
        // @ts-ignore TODO: fix this
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
      <Item
        style={{
          // backgroundColor: 'transparent',
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.3,
          // shadowRadius: 2,
          elevation: 2,
        }}
        onPress={navigateToMeditation}
        big={big}
        height={height}
        key={id.toString() + index.toString()}>
        <ImageBackground
          className="flex-1 items-center justify-center"
          resizeMode="cover"
          source={src}>
          {!hasPremium && isCategoryLocked && (
            <Icon
              style={{
                opacity: 0.3,
              }}
              name="lock"
              size={40}
              color="#000"
            />
          )}
          <TimeLabel height={height}>
            <Icon name="clock" size={8} color="#fff" />
            <SubTitle
              style={{ marginLeft: 4 }}
              color="#fff"
              t={`${meditationTime(duration, true)}`}
            />
          </TimeLabel>
        </ImageBackground>
        <View className="py-1 px-2 h-12 bg-[#160f29]">
          <BoldSubTitle className="flex-1" color={colors.whiteColor} t={name} />
          <MeditationIconsContent
            categoryTitle={categoryTitle}
            instructorName={instructor?.name ?? ''}
          />
        </View>
      </Item>
    );
  },
);

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
