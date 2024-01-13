import CourseMeditations from '@common/components/CourseMeditations';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from '@services/localization/i18n';
import { coursesSelector, practiceHistorySelector } from '@store/selectors';
import React, { useMemo } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Meditation } from 'types/Meditation';

const Course = () => {
  const { hasPremium } = usePurchases();
  const { goBack } = useNavigation();
  const route = useRoute();

  const { id, image } = route.params || ({} as any);
  const allCourses = useSelector(coursesSelector) as any[];
  const history = useSelector(practiceHistorySelector) as Meditation[];

  const historyIds = useMemo(() => {
    const ids = history.map(({ id: medId }) => medId);
    return [...new Set(ids.slice().reverse())];
  }, [history]);

  const course = useMemo(
    () => allCourses.find(c => c.id === id),
    [allCourses, id],
  );

  return (
    <SafeAreaView className="relative w-full h-full bg-[#fdedd6]">
      <ParallaxScrollView image={image}>
        <View className="absolute top-5 left-5 z-10">
          <CircleButton
            size={40}
            icon="chevron-right"
            onPress={goBack}
            backgroundColor="#00000060"
            color="white"
          />
        </View>
        <View className="flex-1 mt-8">
          <View className="mb-8 px-5">
            <Text className="text-2xl font-bold text-black text-left">
              {course.title}
            </Text>
            <Text className="text-lg font-medium mt-4 text-black text-left">
              {course.subTitle}
            </Text>
            <Text className="text-left text-base leading-none font-normal mt-4 text-black">
              {course.info}
            </Text>
          </View>
          <Text className="text-center text-base leading-none font-normal text-gray-700 mb-4">
            {course.meditations.length} {i18n.t('sessions')}
          </Text>
          {/* <SessionsGrid meditations={course.meditations} /> */}
          <CourseMeditations
            history={historyIds}
            items={course.meditations}
            isCategoryLocked={course.isCategoryLocked}
            hasPremium={hasPremium}
          />
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default Course;
