import Collection from '@common/components/Collection';
import CoursesCarousel from '@common/components/CoursesCarousel';
import Divider from '@common/components/Divider';
import DynamicComposition from '@common/components/DynamicComposition';
import Feeling from '@common/components/Feeling';
import Logo from '@common/components/Logo';
import { SubTitle } from '@common/components/Styled';
import Welcome from '@common/components/animation/Welcome';
import BgSelector from '@common/components/buttons/BgSelector';
import ShowAll from '@common/components/buttons/ShowAll';
import { usePurchases } from '@common/context/PurchaseContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useArticleData from '@services/hooks/useArticleData';
import useFeed from '@services/hooks/useFeed';
import { useOnboarding } from '@services/hooks/useOnboarding';
import { useSheetStore } from '@store/useSheetStore';
import { getBGImageByTime } from '@utils/time';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { LinearGradient } from 'react-native-gradients';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Meditation } from 'types/Meditation';

import InstructorList from './InstructorList';

const ListTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
`;

type FeedProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const CopilotView = walkthroughable(View);

const BGS = {
  sunrise: require('./bgs/sunrise.png'),
  sunset: require('./bgs/sunset.png'),
};

const Feed: FC<FeedProps> = ({ navigation, copilot }) => {
  const { getAppData } = useAppData();
  const { getArticleData } = useArticleData();
  const { sex } = useSelector((state: any) => state.userDetails);
  const { setPurchaserIdentity } = usePurchases();
  const [byTimeCollection, latestCollection, ...collections]: Collection[] =
    useFeed();

  const { isOldUser, updateIsOldUser } = useOnboarding();

  const onForeground = useCallback(() => {
    getAppData();
    getArticleData();
  }, [getAppData, getArticleData]);

  useEffect(() => {
    setPurchaserIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAppState({
    onForeground,
  });

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);

  const onShowAll = (title: string, groupedMeditations: any) => {
    // @ts-ignore
    navigation.navigate('Main', {
      screen: 'GroupedMeditations',
      params: { title, meditations: groupedMeditations },
    });
  };

  const setIsOpen = useSheetStore((state: any) => state.setIsOpen);

  const colorList = [
    { offset: '0%', color: '#FCE8CD', opacity: '1' },
    { offset: '50%', color: '#FCE8CD', opacity: '1' },
    { offset: '65%', color: '#FCE8CD', opacity: '0.1' },
    { offset: '100%', color: '#000', opacity: '0' },
  ];

  interface Collection {
    id: string;
    title: string;
    items: Meditation[];
  }

  const { start, copilotEvents } = useCopilot();
  const onStop = useCallback(() => updateIsOldUser(), [updateIsOldUser]);

  useEffect(() => {
    copilotEvents.on('stop', onStop);
    return () => {
      copilotEvents.off('stop', onStop);
    };
  }, [copilotEvents, onStop]);

  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <>
      <View className="h-full w-full bg-[#FCE8CD]">
        <ImageBackground
          source={BGS[getBGImageByTime()]}
          resizeMode="cover"
          style={{
            position: 'absolute',
            flex: 1,
            height: '100%',
            width: '100%',
            top: -100,
          }}
        />
        <View className="absolute -top-4 self-center">
          <Logo opacity={0.5} width={32} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={{
            zIndex: 10,
            backgroundColor: 'transparent',
            position: 'relative',
          }}
          showsVerticalScrollIndicator={false}>
          <View className="absolute top-4 right-4 z-10">
            <BgSelector />
          </View>
          <View className="relative">
            <View className="absolute w-full h-full">
              <LinearGradient colorList={colorList} angle={90} />
            </View>

            <View className="h-[260px]" />

            <CopilotStep
              text="כאן תוכלו למצוא את אוסף של מדיטציות לפי נושאים שונים"
              order={1}
              name="first">
              <CopilotView
                copilot={copilot}
                style={{
                  marginTop: 100,
                  paddingTop: 60,
                }}
                className="flex-1">
                <Collection
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
          </View>

          <View className="bg-[#FCE8CD]">
            <View className="flex-1">
              <Collection
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
                text="כאן תוכלו למצוא מדיטציות על פי מצב הרוח והמיקום שלכם..."
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
                  <Collection
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

              <CopilotStep
                text="כאן תוכלו למצוא את המדריכים שלנו"
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
                text="כאן מתחילים... תוכלו למצוא קורסים שילמדו אתכם תכנים עמוקים יותר"
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
        </ScrollView>
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
              start('first', scrollRef.current);
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
        שמחים שאתם איתנו, יחד ניצור רגעים של רוגע ושלווה במסע שלנו
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
