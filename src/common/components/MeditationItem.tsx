import { categoryImage } from '@common/assets/images';
import { usePurchases } from '@common/context/PurchaseContext';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/meditationTime';
import React, { memo, useCallback } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { meditationInstructor } from 'store/selectors';
import styled from 'styled-components/native';

import { BoldSubTitle, SubTitle } from './Styled';

const CategoryTag = ({ children }) => (
  <View className="flex-row bg-[#000] items-center justify-center rounded-full px-2 py-1 absolute left-1 bottom-1">
    {children}
  </View>
);

const Label = ({ children }) => (
  <View className="flex-row bg-[#000] items-center justify-center rounded-full px-2 py-1 absolute left-1 bottom-1">
    {children}
  </View>
);

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
      <SubTitle className="ml-1" color="#fff" t={instructorName ?? ''} />
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
}

const MeditationItem: React.FC<HorizontalListItemProps> = memo(
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
  }) => {
    const { navigate } = useNavigation();
    const amplitudeInstance = useAmplitude();
    const instructor = useSelector(state => meditationInstructor(state, id));

    const { hasPremium } = usePurchases();

    const navigateToMeditation = useCallback(() => {
      if (!hasPremium && isCategoryLocked) {
        // @ts-ignore TODO: fix this
        navigate('Subscribe');
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
        big={false}
        key={id.toString() + index.toString()}>
        <ImageBackground
          className="flex-1 items-center justify-center"
          resizeMode="cover"
          source={src}>
          {/* <CategoryTag>
            <Text>{categoryTitle}</Text>
          </CategoryTag> */}
          {!hasPremium && isCategoryLocked && (
            <View className="bg-black/75 rounded-full p-1 w-8 h-8 flex justify-center items-center absolute top-2 right-2">
              <Icon name="lock" size={16} color="#fff" />
            </View>
          )}
          <View className="flex-row bg-black/75 rounded-full px-2 py-1 absolute bottom-2 left-1 items-center">
            <IconFontAwesome name="play" size={8} color="#fff" />
            <Text className="ml-2 text-white text-[10px]">
              {meditationTime(duration, true)}
            </Text>
          </View>
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
  flex: 0.5;
  height: ${({ height }) =>
    height === 'small' ? 120 : height === 'large' ? 280 : 160};
  margin: 4px;
  border-radius: 8px;
  overflow: hidden;
`;

export default MeditationItem;
