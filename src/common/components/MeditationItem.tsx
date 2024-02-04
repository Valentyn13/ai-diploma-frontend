import { getCategoryImg } from '@common/assets/images/index';
import { CATEGORY_COLOR, MEDITATIONS_IMAGES_URL } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { meditationInstructor } from '@store/selectors';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/time';
import React, { memo, useCallback } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';

interface MeditationItemProps {
  item: {
    id: string;
    name: string;
    url?: string;
    duration: number;
    categoryName: string;
    animation?: string;
    thumbnail?: string;
    isCategoryLocked: boolean;
    categoryTitle: string;
    image?: string;
    description?: string;
  };
  index: number;
}

const MeditationItem: React.FC<MeditationItemProps> = memo(
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
      image,
    },
    index,
  }) => {
    const { navigate } = useNavigation();
    const amplitudeInstance = useAmplitude();
    const instructor = useSelector(state => meditationInstructor(state, id));

    const { hasPremium } = usePurchases();

    const navigateToPlayer = useCallback(() => {
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

    const navigateToModal = useCallback(() => {
      amplitudeInstance.logEvent('MEDITATION_MODAL_CLICKED');
      logEvent('MEDITATION_MODAL_CLICKED', { id, categoryName });
      amplitudeInstance.uploadEvents();
      // @ts-ignore TODO: fix this
      navigate('SessionModal', { id });
    }, [amplitudeInstance, categoryName, id, navigate]);

    return (
      <View
        style={{
          width: theme.dimens.winWidth / 2.4,
          height: 230,
          maxWidth: theme.dimens.winWidth / 2 - 28,
        }}>
        <Pressable
          onPress={navigateToPlayer}
          className="flex-1 overflow-hidden"
          style={{
            borderRadius: 8,
          }}>
          <ImageBackground
            style={{
              // @ts-ignore
              backgroundColor: CATEGORY_COLOR[categoryName] || '#0B2761',
            }}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
            source={{
              uri: image
                ? `${MEDITATIONS_IMAGES_URL}${image}`
                : getCategoryImg(categoryName, index, thumbnail),
            }}>
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
                  {meditationTime(duration)}
                </Text>
              </View>
            )}
          </ImageBackground>
        </Pressable>
        <Pressable
          onPress={navigateToModal}
          className="flex flex-col items-start justify-start py-1 px-2 h-16">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-black text-[15px] font-medium text-left tracking-tighter leading-[20px] w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center">
            <IconFontAwesome color="#000" name="user-large" size={10} />
            <Text className="text-black text-xs ml-1">
              {instructor?.name ?? ''}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  },
);

export default MeditationItem;
