import CoursesCarousel from '@common/components/CoursesCarousel';
import Divider from '@common/components/Divider';
import DynamicComposition from '@common/components/DynamicComposition';
import Feeling from '@common/components/Feeling';
import Gradient from '@common/components/Gradient';
import HorizontalCollection from '@common/components/HorizontalCollection';
import Logo from '@common/components/Logo';
import Personalized from '@common/components/Personalized';
import SessionItem from '@common/components/SessionItem';
import { SubTitle } from '@common/components/Styled';
import Welcome from '@common/components/animation/Welcome';
import ShowAll from '@common/components/buttons/ShowAll';
import { EXERCISES } from '@common/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useFeed from '@services/hooks/useFeed';
import { useOnboarding } from '@services/hooks/useOnboarding';
import { useUser } from '@services/hooks/useUser';
import { useSheetStore } from '@store/useSheetStore';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';
import styled from 'styled-components/native';
import { Session } from 'types/Meditation';

import InstructorList from './InstructorList';
import ParallaxScroll from './ParallaxScroll';

const ListTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
`;

type FeedProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const CopilotView = walkthroughable(View);

const Feed: FC<FeedProps> = ({ navigation, copilot }) => {
  const { getAppData } = useAppData();
  const {
    user: { sex },
  } = useUser();
  const [byTimeCollection, latestCollection, ...collections]: Collection[] =
    useFeed();

  const { isOldUser, updateIsOldUser } = useOnboarding(navigation);

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

  interface Collection {
    id: string;
    title: string;
    items: Session[];
  }

  // const { start, copilotEvents } = useCopilot();
  // const onStop = useCallback(() => updateIsOldUser(), [updateIsOldUser]);

  // useEffect(() => {
  //   copilotEvents.on('stop', onStop);
  //   return () => {
  //     copilotEvents.off('stop', onStop);
  //   };
  // }, [copilotEvents, onStop]);

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
      <View className="h-full w-full">
        <View className="absolute -top-4 self-center">
          <Logo opacity={0.5} width={32} />
        </View>

        <ParallaxScroll>
          <View className="relative">
            <Personalized />

            <View className="relative bg-[#FCE8CD]">
              <View className="absolute top-0 h-48 w-full">
                <Gradient colors={['#FFFFFF', '#FCE8CD']} angle={90} />
              </View>

              <CopilotStep
                text="כאן תוכלו למצוא מגוון עשיר של מדיטציות מותאמות אישית לצרכים שלכם"
                order={1}
                name="first">
                <CopilotView
                  copilot={copilot}
                  style={{
                    paddingTop: 100,
                  }}
                  className="flex-1">
                  <HorizontalCollection
                    key="by-time"
                    title={byTimeCollection.title}
                    items={byTimeCollection.items}
                    onShowAll={() => {
                      onShowAll(byTimeCollection.title, byTimeCollection.items);
                    }}
                  />

                  <Divider className="my-6" />
                </CopilotView>
              </CopilotStep>

              <View className="bg-[#FCE8CD]">
                <View className="flex-1">
                  <HorizontalCollection
                    shuffle={false}
                    key={latestCollection.id}
                    title={latestCollection.title}
                    items={latestCollection.items}
                    onShowAll={() => {
                      onShowAll(latestCollection.title, latestCollection.items);
                    }}
                  />
                  <Divider className="my-6" />
                </View>

                <DynamicComposition>
                  <CopilotStep
                    text="גלו מדיטציות המותאמות למצב הרוח והמיקום שלכם בכל יום"
                    order={3}
                    name="howufeel">
                    <CopilotView copilot={copilot}>
                      <View className="flex w-full items-center px-5 flex-1">
                        <ListTitle k="personalized" />
                        <View className="w-full flex items-center mt-5">
                          <Feeling
                            onClick={() => setIsOpen(true)}
                            isMale={sex === 'M'}
                          />
                        </View>
                        <Divider className="my-6" />
                      </View>
                    </CopilotView>
                  </CopilotStep>

                  {collections.map(({ id, title, items }) => (
                    <View className="flex-1">
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
                    text="פגשו את צוות המורים שלנו שינחו אתכם לאורך הדרך"
                    order={4}
                    name="instructors">
                    <CopilotView copilot={copilot} className="flex-1">
                      <View className="flex flex-row items-center justify-between w-full mb-5 pl-5 pr-3">
                        <ListTitle k="צוות המורים" />
                        <ShowAll
                          onPress={() => navigation.navigate('Instructors')}
                        />
                      </View>
                      <InstructorList />
                      <Divider className="my-6" />
                    </CopilotView>
                  </CopilotStep>

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
                </DynamicComposition>
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
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
