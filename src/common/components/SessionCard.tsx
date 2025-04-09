import images from '@common/assets/images';
import { CATEGORY_COLOR } from '@common/constants';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import {
  ChatCategories,
  useCategorizedChatFlowStore,
} from '@store/useCategorizedChatFlowStore';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import meditationTime from '@utils/time';
import React, { FC, memo, useCallback } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';

interface MeditationItemProps {
  item: {
    id: string;
    name: string;
    duration: number;
    categoryName: string;
    image?: string;
  };
  width?: number;
  height?: number;
  index: number;
}

const SessionCard: FC<MeditationItemProps> = memo(
  ({
    item: { id, name, image, duration, categoryName },
    width = theme.dimens.winWidth / 2 - 28,
    height = 230,
  }) => {
    const { navigate } = useNavigation();
    const { setCurrentCategory, setCurrentStep } = useDocumentChatStore(
      state => ({
        setCurrentStep: state.setCurrentStep,
        setCurrentCategory: state.setCategory,
      }),
    );
    const { setCurrentCategory: setChatCategory, setCurrentStep: setChatStep } =
      useCategorizedChatFlowStore(state => ({
        setCurrentCategory: state.setSelectedCategory,
        setCurrentStep: state.setCurrentStep,
      }));
    const onCardPress = useCallback(() => {
      if (id === 'medicine' || id === 'engineering' || id === 'law') {
        setCurrentCategory(id);
        setCurrentStep('list');
        navigate('Courses');
      } else {
        console.log(id)
        setChatCategory(id as ChatCategories);
        setChatStep('list');
        navigate('Chat');
      }
    }, [
      id,
      navigate,
      setChatCategory,
      setChatStep,
      setCurrentCategory,
      setCurrentStep,
    ]);

    return (
      <View
        style={{
          width,
          height,
        }}>
        <TouchableOpacity
          onPress={onCardPress}
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
              uri: image,
            }}>
            <View className="flex-row bg-black/50 rounded-full px-2 py-1 absolute bottom-2 left-2 items-center">
              <IconFontAwesome name="play" size={12} color="#fff" />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View className="flex flex-col items-start justify-start py-1 px-2 h-16">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-[#161616] text-[16px] text-left leading-[20px] w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center mt-[4px]">
            {/*  */}
            <FastImage
              className="h-[24px] w-[24px] rounded-full"
              source={images('michael_home')}
            />
            <Text className="text-[#505050] text-[13px] leading-[15px] ml-1">
              Майкл
            </Text>
          </View>
        </View>
      </View>
    );
  },
);

export default SessionCard;
