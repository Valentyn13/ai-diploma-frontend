import { categoryImage } from '@common/assets/images';
import { CATEGORY_COLOR } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
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

interface HorizontalListItemProps {
  horizontal?: boolean;
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
    horizontal = false,
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
      <TouchableOpacity
        style={{
          width: horizontal
            ? theme.dimens.winWidth / 2.4
            : theme.dimens.winWidth / 2,
          height: horizontal ? 180 : 280,
          maxWidth: theme.dimens.winWidth / 2 - 16,
        }}
        onPress={navigateToMeditation}
        className="h-48 flex-1 rounded-lg overflow-hidden m-1">
        <ImageBackground
          className="flex-1 items-center justify-center"
          resizeMode="cover"
          source={src}>
          <View
            style={{
              // @ts-ignore
              backgroundColor: CATEGORY_COLOR[categoryName] || '#0B2761',
            }}
            className="absolute top-2 right-2 rounded-full px-2 py-1">
            <Text className="text-white text-[12px]">{categoryTitle}</Text>
          </View>
          {!hasPremium && isCategoryLocked && (
            <View className="bg-gray-200 rounded-full p-1 w-8 h-8 flex justify-center items-center absolute top-2 right-2">
              <Icon name="lock" size={16} color="#333" />
            </View>
          )}
          <View className="flex-row bg-black/75 rounded-full px-2 py-1 absolute bottom-2 left-2 items-center">
            <IconFontAwesome name="play" size={12} color="#fff" />
            <Text className="ml-2 text-white text-[12px]">
              {meditationTime(duration, true)}
            </Text>
          </View>
        </ImageBackground>
        <View className="flex flex-col items-start justify-center py-1 px-2 h-12 bg-[#160f29]">
          <Text className="text-white text-lg font-bold text-left tracking-tighter leading-6 w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center">
            <IconFontAwesome color="#fff" name="user-large" size={10} />
            <Text className="text-white text-xs ml-1">
              {instructor?.name ?? ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
