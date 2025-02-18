import CoursesBanner from '@common/components/Banner/CoursesBanner';
import ExploreLinks from '@common/components/ExploreLinks';
import Feeling from '@common/components/Feeling';
import HorizontalCollection from '@common/components/HorizontalCollection';
import Personalized from '@common/components/Personalized';
import Welcome from '@common/components/animation/Welcome';
import ShowAll from '@common/components/buttons/ShowAll';
import {
  AMPLITUDE_EVENTS,
  CATEGORY_NAMES,
  CategoriesObject,
  EXPLORE_LINK_BUTTONS,
  MeditationCategoryKey,
  PICK_MEDITATION_CATEGORY_IDS,
} from '@common/constants';
//import { usePurchases } from '@common/context/PurchaseContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useFeed from '@services/hooks/useFeed';
import useLatestChat from '@services/hooks/useLatestChat';
import { useOnboarding } from '@services/hooks/useOnboarding';
import { useUser } from '@services/hooks/useUser';
import { categoriesSelector } from '@store/selectors';
//import { useUser } from '@services/hooks/useUser';
import { useSheetStore } from '@store/useSheetStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';
import { useSelector } from 'react-redux';
import { Category } from 'types/Category';
import { Session } from 'types/Meditation';

import InstructorList from './InstructorList';
import MichaelCard from './MichaelCard';
import ParallaxScroll from './ParallaxScroll';

type FeedProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const CopilotView = walkthroughable(View);

const Feed: FC<FeedProps> = ({ navigation, copilot }) => {
  // const { hasPremium } = usePurchases();
  const { getAppData } = useAppData();

  const {
    user: { sex, hasPassedStarterChat },
  } = useUser();
console.log(hasPassedStarterChat)
  const byTimeCollection = useMemo(() => {}, []);
  const latestCollection = useMemo(() => {}, []);
  const collections = useMemo(() => [], []);
  const { isOldUser, updateIsOldUser } = useOnboarding(navigation);

  const {
    chats,
    lastActiveSessionIndex,
    latestChat,
    handleOpenRecentChat,
    handleOpenChats,
  } = useLatestChat({
    withNavigation: true,
  });

  const categories = useMemo(() => [], []);

  const onForeground = useCallback(() => {
    getAppData();
  }, [getAppData]);

  useAppState({
    onForeground,
  });

  const onShowAll = (title: string, sessions: Session[]) => {
    // @ts-ignore
    navigation.navigate('Main', {
      screen: 'Collection',
      params: { title, sessions },
    });
  };

  const setIsOpen = useSheetStore((state: any) => state.setIsOpen);

  const [_, topRatedCollection, recommendedCollection] = useMemo(() => {
    return [[], [], []];
  }, []);

  const categoriesArrayToObject: CategoriesObject = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {} as CategoriesObject);
  }, [categories]);

  function getMeditationData(id: MeditationCategoryKey) {
    return categoriesArrayToObject[PICK_MEDITATION_CATEGORY_IDS[id]] || [];
  }

  const sleep = getMeditationData('sleep');

  const breathe = getMeditationData('breathe');

  const MichaelCardConfig = useMemo(() => {
    const isChatsExists = chats.length > 0;
    return {
      title: isChatsExists
        ? 'שנמשיך מאיפה שהפסקנו?'
        : 'לשתף, להתייעץ, או סתם לפרוק',
      subtitle: isChatsExists
        ? `${
            CATEGORY_NAMES[latestChat?.category || '']
          } פגישה ${lastActiveSessionIndex}`
        : 'מיכאל כאן בשבילך',
      handleButtonPress: isChatsExists ? handleOpenRecentChat : handleOpenChats,
    };
  }, [
    chats.length,
    handleOpenChats,
    handleOpenRecentChat,
    lastActiveSessionIndex,
    latestChat?.category,
  ]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const scrollRef = useRef<ScrollView>(null);

  return (
    <>
      <View className="flex-1">
        {/* <View className="absolute  self-center">
          <Logo opacity={0.5} width={32} />
        </View> */}

        <ParallaxScroll>
          <View className="relative">
            <Personalized />
            <View className="relative bg-[#FFF7EE]">
              <View className="mt-10" />

              {/* BY TIME */}
              <CopilotStep
                text="כאן תוכלו למצוא מגוון עשיר של מדיטציות מותאמות אישית לצרכים שלכם"
                order={1}
                name="first">
                <CopilotView copilot={copilot} className="flex-1 mt-[40px]">
                  <HorizontalCollection
                    key="by-time"
                    title={byTimeCollection?.title}
                    items={byTimeCollection?.items}
                    onShowAll={() => {
                      onShowAll(
                        byTimeCollection?.title,
                        byTimeCollection?.items,
                      );
                    }}
                  />
                </CopilotView>
              </CopilotStep>

              <CopilotStep
                text="מדיטציה בהתאמה אישית"
                order={3}
                name="howufeel">
                <CopilotView copilot={copilot} className="mt-[24px]">
                  <View className="flex w-full items-center px-5 flex-1">
                    <Text className="text-[20px] w-full text-left font-medium text-[#414141] leading-[23px]">
                      מדיטציה בהתאמה אישית
                    </Text>
                    <View className="w-full flex items-center mt-5">
                      <Feeling
                        onClick={() => setIsOpen(true)}
                        isMale={sex === 'M'}
                      />
                    </View>
                  </View>
                </CopilotView>
              </CopilotStep>

              {/* MOST POPULAR / TOP RATED */}
              {topRatedCollection.map(({ id, title, items }) => (
                <View className="flex-1 mt-[38px]" key={id}>
                  <HorizontalCollection
                    shuffle={id !== 'top-rated' && id !== 'latest-release'}
                    key={id}
                    title={title}
                    items={items}
                    onShowAll={() => {
                      onShowAll(title, items);
                    }}
                  />
                </View>
              ))}

              <View className="my-[40px]">
                <CoursesBanner />
              </View>

              {/* RECENTLY UPLOADED */}
              <View className="bg-[#FFF7EE]">
                <View className="flex-1">
                  <HorizontalCollection
                    shuffle={false}
                    key={latestCollection?.id}
                    title={latestCollection?.title}
                    items={latestCollection?.items}
                    onShowAll={() => {
                      onShowAll(latestCollection?.title, latestCollection?.items);
                    }}
                  />
                </View>

                {/* Instructors Carousel */}
                {/* <CopilotStep
                  text="פגשו את צוות המורים שלנו שינחו אתכם לאורך הדרך"
                  order={4}
                  name="instructors">
                  <CopilotView
                    copilot={copilot}
                    className="flex-1 mt-[28px] mb-4">
                    <View className="flex flex-row items-center justify-between w-full mb-5 pl-5 pr-3">
                      <Text className="text-[#414141] text-[20px] font-medium leading-[23px]">
                        צוות המורים
                      </Text>
                      <ShowAll
                        onPress={() => navigation.navigate('Instructors')}
                      />
                    </View>
                    <InstructorList />
                  </CopilotView>
                </CopilotStep> */}

                {/* RECOMMENDED */}
                {recommendedCollection.map(({ id, title, items }) => (
                  <View className="flex-1 mt-[22px]" key={id}>
                    <HorizontalCollection
                      shuffle={id !== 'top-rated' && id !== 'latest-release'}
                      key={id}
                      title={title}
                      items={items}
                      onShowAll={() => {
                        onShowAll(title, items);
                      }}
                    />
                  </View>
                ))}

                {/* <DynamicComposition>
                  {mCollections.map(({ id, title, items }) => (
                    <View className="flex-1" key={id}>
                      <HorizontalCollection
                        shuffle={id !== 'top-rated' && id !== 'latest-release'}
                        key={id}
                        title={title}
                        items={items}
                        onShowAll={() => {
                          onShowAll(title, items);
                        }}
                      />
                      <Divider className="my-6" />
                    </View>
                  ))}

                  <View className="flex-1">
                    <HorizontalCollection
                      shuffle={false}
                      limit={6}
                      title="תרגולי נשימה"
                      items={EXERCISES.map(({ id, name, colors }) => ({
                        id,
                        name,
                        colors,
                      }))}
                      renderItem={SessionItem}
                    />
                    <Divider className="my-6" />
                  </View>

                  <CopilotStep
                    text="התחילו את המסע שלכם - כאן תמצאו את הקורס למתחילים שילמד אתכם את יסודות התרגול"
                    order={2}
                    name="courses">
                    <CopilotView copilot={copilot} className="flex-1">
                      <CoursesCarousel
                        withParallax
                        height={280}
                        title="courses"
                        fullScreen={false}
                      />
                      <Divider className="my-6" />
                    </CopilotView>
                  </CopilotStep>
                </DynamicComposition> */}

                {/* Quick Links */}
                <View className="mt-[28px] mb-[40px]">
                  <ExploreLinks
                    categoryData={{
                      sleep,
                      breathe,
                    }}
                    onShowAll={onShowAll}
                    data={EXPLORE_LINK_BUTTONS}
                  />
                </View>
              </View>
            </View>
          </View>
        </ParallaxScroll>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal && !isOldUser}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <WelcomeMessage
            onPress={() => {
              setShowModal(false);
              updateIsOldUser();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default Feed;

const WelcomeMessage = ({ onPress }) => {
  return (
    <View
      className="flex flex-col items-center w-11/12"
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text style={{ fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
        ברוכים הבאים לרגע
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }}>
        המפתח לחיים שלווים ומאושרים יותר מתחיל כאן.
      </Text>

      <View className="w-64 h-64 bg-[#513F73]/20 rounded-full mt-6 mb-4">
        <Welcome />
      </View>
      <View className="mt-6">
        <Button title="בואו נתחיל" onPress={onPress} />
      </View>
    </View>
  );
};
