import { getCategoryImg } from '@common/assets/images/index';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { CATEGORY_COLOR, MEDITATIONS_IMAGES_URL } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  allMeditations as allMeditationsSelector,
  meditationInstructor,
} from '@store/selectors';
import React, { useMemo } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Meditation } from 'types/Meditation';

const SessionModal = ({ navigation }) => {
  const route = useRoute();
  const { hasPremium } = usePurchases();
  const { goBack } = useNavigation();
  const { id } = route.params || ({} as any);
  const allMeditations = useSelector(allMeditationsSelector) as Meditation[];
  const instructor = useSelector(state => meditationInstructor(state, id));

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

  if (!meditation) {
    return navigation.goBack();
  }

  const description =
    'התמקדות ורוגע לפני מבחן - מדיטציה זו מתמקדת ביצירת אווירה פנימית של שקט ורוגע, במיוחד חשובה לקראת מבחן. דרך תרגילי נשימה מודעת וסריקת גוף, אנחנו מלמדים את המוח לשחרר מחשבות מטרידות ולהתמקד ברגע הנוכחי. התרגול מסייע בשחרור מתחים פיזיים ומנטליים, ומעניק תחושת יציבות וביטחון לקראת האתגר הקרוב. מתאימה במיוחד לסטודנטים ולכל מי שמעוניין לשפר את יכולת הריכוז וההתמודדות עם לחץ.';

  return (
    <SafeAreaView className="flex-1 bg-[#fdedd6]">
      <ParallaxScrollView image={image}>
        <View className="absolute top-5 left-5">
          <CircleButton
            size={40}
            icon="chevron-down"
            onPress={goBack}
            backgroundColor="#00000060"
            color="white"
          />
        </View>
        <View className="relative mt-8 mx-5">
          <View className="absolute -top-16 right-0">
            <CircleButton
              size={60}
              icon="play"
              onPress={() => {}}
              backgroundColor="#513F73"
              color="white"
            />
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-black text-left">
              {meditation.name}
            </Text>
            <View>
              {/* <View className="flex-row bg-black/50 rounded-full px-2 py-1 items-center">
                <IconFontAwesome name="play" size={12} color="#fff" />
                <Text className="ml-2 text-white text-xs">
                  {meditationTime(meditation.duration, true)}
                </Text>
              </View> */}
              <View
                style={{
                  // @ts-ignore
                  backgroundColor:
                    CATEGORY_COLOR[meditation.categoryName] || '#0B2761',
                }}
                className="rounded-full px-2 py-1">
                <Text className="text-white text-xs">
                  {meditation.categoryTitle}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            //@ts-ignore
            onPress={() =>
              navigation.navigate('Instructor', { id: instructor._id })
            }
            className="flex-row items-center mt-2">
            <Image
              source={{ uri: instructor.image }}
              className="bg-black/50 rounded-full w-7 h-7 mr-2"
            />
            <Text className="text-lg font-medium text-black text-left">
              {instructor.name}
            </Text>
          </Pressable>
          <Text className="text-base leading-none font-normal mt-4 text-black text-left">
            {description}
          </Text>
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default SessionModal;
