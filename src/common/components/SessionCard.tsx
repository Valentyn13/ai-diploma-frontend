import { getCategoryImg } from '@common/assets/images/index';
import { CATEGORY_COLOR, MEDITATIONS_IMAGES_URL } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { meditationInstructor } from '@store/selectors';
import { logEvent } from '@utils/analytics';
import { isRecent } from '@utils/session';
import meditationTime from '@utils/time';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { EnrichedSession } from 'types/Meditation';

interface MeditationItemProps {
  item: EnrichedSession;
  width?: number;
  height?: number;
  index: number;
}

const Indicator: FC = () => (
  <View
    style={{
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: '#F62C36',
      borderRadius: 10,
      width: 12,
      height: 12,
    }}
  />
);

const SessionCard: FC<MeditationItemProps> = memo(
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
      image,
      createdAt,
    },
    width = theme.dimens.winWidth / 2 - 28,
    height = 230,
    index,
  }) => {
    const { navigate } = useNavigation();
    const amplitudeInstance = useAmplitude();
    const instructor = useSelector(state => meditationInstructor(state, id));
    const { hasPremium } = usePurchases();
    const isNew = useMemo(() => isRecent({ createdAt }), [createdAt]);

    const navigateToPlayer = useCallback(() => {
      if (!hasPremium && isCategoryLocked) {
        // @ts-ignore TODO: fix this
        navigate('Subscribe');
      } else {
        amplitudeInstance.logEvent('MEDITATION_CLICKED');
        amplitudeInstance.logEvent('MEDITATION_PLAY');
        logEvent('MEDITATION_CLICKED', { id, name });
        logEvent('MEDITATION_PLAY', { id, name });
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
      amplitudeInstance.logEvent('MEDITATION_MODAL_CLICKED', { id, name });
      logEvent('MEDITATION_MODAL_CLICKED', { id, name });
      amplitudeInstance.uploadEvents();
      // @ts-ignore TODO: fix this
      navigate('SessionModal', { id });
    }, [amplitudeInstance, id, name, navigate]);

    return (
      <View
        style={{
          width,
          height,
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
            {!hasPremium && isCategoryLocked ? (
              <View className="bg-black/50 rounded-full p-1 w-6 h-6 flex justify-center items-center absolute bottom-2 left-2">
                <IconFontAwesome name="lock" size={12} color="#fff" />
              </View>
            ) : (
              <View className="flex-row bg-black/50 rounded-full px-2 py-1 absolute bottom-2 left-2 items-center">
                <IconFontAwesome name="play" size={12} color="#fff" />
                <Text className="ml-2 text-white font-light">
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
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-[#161616] text-[16px] text-left leading-[20px] w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center mt-[4px]">
            {/*  */}
            {instructor?.image ? (
              <FastImage
                className="h-[24px] w-[24px] rounded-full"
                source={{ uri: instructor.image }}
              />
            ) : (
              <IconFontAwesome color="#000" name="user-large" size={10} />
            )}

            <Text className="text-[#505050] text-[13px] leading-[15px] ml-1">
              {instructor?.name ?? ''}
            </Text>
          </View>
        </Pressable>
        {isNew && <Indicator />}
      </View>
    );
  },
);

export default SessionCard;
