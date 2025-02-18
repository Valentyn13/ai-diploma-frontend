import { getCategoryImg } from '@common/assets/images/index';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { CATEGORY_COLOR, MEDITATIONS_IMAGES_URL } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import meditationTime from '@utils/time';
import React, { useCallback, useMemo } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { Session } from 'types/Meditation';

const SessionModal = ({ navigation }) => {
  const route = useRoute();
  const { hasPremium } = usePurchases();
  const { goBack } = useNavigation();
  const { id } = route.params || ({} as any);
  const allMeditations = useMemo(() => [], []);
  const instructor = useMemo(() => {}, []);

  const meditation = useMemo(
    () => allMeditations.find(m => m.id === id),
    [allMeditations, id],
  );

  const image = useMemo(
    () =>
      meditation?.image
        ? `${MEDITATIONS_IMAGES_URL}${meditation?.image}`
        : getCategoryImg(
            meditation?.categoryName || '',
            0,
            meditation?.thumbnail,
          ),
    [meditation],
  );

  const onPressPlay = useCallback(() => {
    if (hasPremium) {
      navigation.navigate('MeditationPlayer', { item: meditation });
    } else {
      navigation.navigate('Subscribe');
    }
  }, [hasPremium, meditation, navigation]);

  if (!meditation) {
    return navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-bg">
      <ParallaxScrollView
        image={image}
        renderStickyHeader={() => (
          <View className="absolute top-5 left-5">
            <CircleButton
              size={40}
              icon="chevron-down"
              onPress={goBack}
              backgroundColor="#00000060"
              color="white"
            />
          </View>
        )}>
        <View className="relative mt-8 mx-5">
          <View className="absolute -top-16 right-0">
            <TouchableOpacity
              onPress={onPressPlay}
              className="flex-row items-center justify-center rounded-full"
              style={{
                backgroundColor: '#273051',
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                style={{
                  marginRight: 2,
                }}
                name="play"
                size={34}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-2xl font-semibold text-black text-left">
              {meditation.name}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between mt-2">
            <Pressable
              //@ts-ignore
              onPress={() =>
                !!instructor
                  ? navigation.navigate('Instructor', { id: instructor._id })
                  : {}
              }
              className="flex-row items-center justify-center space-x-2">
              <Image
                source={{ uri: instructor?.image }}
                className="bg-black/50 rounded-full w-7 h-7"
              />
              <Text className="text-lg font-medium text-black text-left">
                {instructor?.name}
              </Text>
            </Pressable>
          </View>

          <Text className="text-base leading-none font-normal mt-4 text-black text-left">
            {meditation.description}
          </Text>
          <View className="flex flex-row space-x-2 w-full justify-end mt-4">
            <View className="flex-row bg-black/50 rounded-full px-2 py-1 items-center">
              <Icon name="play" size={12} color="#fff" />
              <Text className="ml-2 text-white text-xs">
                {meditationTime(meditation.duration)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor:
                  // @ts-ignore
                  CATEGORY_COLOR[meditation.categoryName] || '#0B2761',
              }}
              className="rounded-full px-2 py-1">
              <Text className="text-white text-xs">
                {meditation.categoryTitle}
              </Text>
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default SessionModal;
