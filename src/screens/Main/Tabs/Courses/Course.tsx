import CourseMeditations from '@common/components/CourseMeditations';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from '@services/localization/i18n';
import { coursesSelector, practiceHistorySelector } from '@store/selectors';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Meditation } from 'types/Meditation';

const Course = () => {
  const { hasPremium } = usePurchases();
  const navigation = useNavigation();
  const route = useRoute();

  const { id, image } = route.params || ({} as any);
  const allCourses = useSelector(coursesSelector) as any[];
  const history = useSelector(practiceHistorySelector) as Meditation[];

  const historyIds = useMemo(
    () => history.map(({ id: medId }) => medId),
    [history],
  );

  const course = useMemo(
    () => allCourses.find(c => c.id === id),
    [allCourses, id],
  );

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="bg-[#fdedd6] flex-1">
      <ParallaxScrollView
        image={image}
        backgroundColor="#fdedd6"
        contentBackgroundColor="#fdedd6"
        parallaxHeaderHeight={200}
        renderForeground={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000060',
              height: 200,
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              }}>
              {course?.title || ''}
            </Text>
          </View>
        )}
        renderStickyHeader={() => (
          <View className="absolute left-5 top-5 z-10">
            <CircleButton
              size={40}
              icon="chevron-right"
              onPress={() => navigation.goBack()}
              backgroundColor="#00000060"
              color="white"
            />
          </View>
        )}>
        <View className="px-5 mt-8 mb-8">
          <Text className="text-lg font-medium mt-4 text-black text-left">
            {course?.subTitle}
          </Text>
          <Text className="text-left text-base leading-none font-normal mt-4 text-black">
            {course?.info}
          </Text>
        </View>
        <Text className="text-center text-base leading-none font-normal text-gray-700 mb-4">
          {course?.meditations.length} {i18n.t('sessions')}
        </Text>
        <CourseMeditations
          history={historyIds}
          items={course?.meditations || []}
          isCategoryLocked={course?.isCategoryLocked}
          hasPremium={hasPremium}
        />
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default Course;
