import { getCategoryImgName } from '@common/assets/images';
import { CATEGORY_COLOR } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/meditationTime';
import React, { memo, useCallback } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { meditationInstructor } from 'store/selectors';

const BGS_ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/bgs/';

interface MeditationItemProps {
  horizontal?: boolean;
  big?: boolean;
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

const MeditationItem: React.FC<MeditationItemProps> = memo(
  ({
    horizontal = false,
    big = false,
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

    const pathName = getCategoryImgName(categoryName, index, thumbnail);

    return (
      <Pressable
        style={{
          width: horizontal
            ? theme.dimens.winWidth / 2.4
            : theme.dimens.winWidth / 2,
          height: horizontal ? 220 : 280,
          maxWidth: theme.dimens.winWidth / 2 - 16,
        }}
        onPress={navigateToMeditation}
        className="flex-1 overflow-hidden m-1">
        <View
          className="flex-1 overflow-hidden"
          style={{
            borderRadius: big ? 16 : 8,
          }}>
          <ImageBackground
            className="flex-1 items-center justify-center"
            resizeMode="cover"
            source={{ uri: `${BGS_ASSETS_URL}${pathName}` }}>
            <View
              style={{
                // @ts-ignore
                backgroundColor: CATEGORY_COLOR[categoryName] || '#0B2761',
              }}
              className="absolute top-2 right-2 rounded-full px-2 py-1">
              <Text className="text-white text-xs">{categoryTitle}</Text>
            </View>
            {!hasPremium && isCategoryLocked ? (
              <View className="bg-black/50 rounded-full p-1 w-6 h-6 flex justify-center items-center absolute bottom-2 left-2">
                <IconFontAwesome name="lock" size={12} color="#fff" />
              </View>
            ) : (
              <View className="flex-row bg-black/50 rounded-full px-2 py-1 absolute bottom-2 left-2 items-center">
                <IconFontAwesome name="play" size={12} color="#fff" />
                <Text className="ml-2 text-white text-xs">
                  {meditationTime(duration, true)}
                </Text>
              </View>
            )}
          </ImageBackground>
        </View>
        <View className="flex flex-col items-start justify-center py-1 px-2 h-12">
          <Text className="text-black text-[15px] font-medium text-left tracking-tighter leading-6 w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center">
            <IconFontAwesome color="#000" name="user-large" size={10} />
            <Text className="text-black text-xs ml-1">
              {instructor?.name ?? ''}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  },
);

export default MeditationItem;
