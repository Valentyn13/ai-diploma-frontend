import HomeTopBg from '@common/assets/images/HomeTopBg.png';
import CategoryMeditations from '@common/components/CategoryMeditations';
import CoursesCarousel from '@common/components/CoursesCarousel';
import { HEIGHT_RATIO } from '@common/components/CoursesCarouselItem';
import Feeling from '@common/components/Feeling';
import HorizontalList from '@common/components/HorizontalList';
import { Container, SubTitle } from '@common/components/Styled';
import { SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useArticleData from '@services/hooks/useArticleData';
import { useOnboarding } from '@services/hooks/useOnboarding';
import i18n from '@services/localization/i18n';
import { logEvent } from '@utils/analytics';
import { shuffleArray } from '@utils/array';
import isLowResolution from '@utils/isLowResolution';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffShowReminderPopup } from 'store/actions';
import {
  homeCategoriesSelector,
  homeMeditationsSelector,
  latestMeditationSelector,
  toptMeditationSelector,
} from 'store/selectors';
import styled from 'styled-components/native';

import { useSheetStore } from '../../../../store/useSheetStore';
import Article from './Article';
import InstructorList from './InstructorList';
import ReminderPopup from './ReminderPopup';

const ListTitle = styled(SubTitle)`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
`;

type FeedProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Feed: FC<FeedProps> = ({ navigation }) => {
  const { getAppData } = useAppData();
  const { getArticleData } = useArticleData();
  const { email } = useSelector((state: any) => state.userDetails);
  const { articles } = useSelector((state: any) => state.articleData);
  const { setPurchaserIdentity } = usePurchases();
  const [showNotificationModal, setshowNotificationModal] = useState(false);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const meditations = useSelector(homeMeditationsSelector);
  const latest = useSelector(latestMeditationSelector);
  const topRated = useSelector(toptMeditationSelector);
  const { shouldShowReminderPopup } = useSelector(
    (state: any) => state.userProgress,
  );
  const categories = useSelector(homeCategoriesSelector);
  categories.sort((a: any, b: any) => a.order - b.order);

  useOnboarding();

  const notificationModal = useCallback(async () => {
    logEvent('ReminderPopupOpened', { email });
    dispatch(turnOffShowReminderPopup());
    setshowNotificationModal(true);
  }, [dispatch, email]);

  const onForeground = useCallback(() => {
    getAppData();
    getArticleData();
  }, [getAppData, getArticleData]);

  useFocusEffect(
    useCallback(() => {
      setData(meditations);
      if (
        shouldShowReminderPopup === SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON
      ) {
        notificationModal();
      }
    }, [meditations, shouldShowReminderPopup, notificationModal]),
  );

  useEffect(() => {
    setPurchaserIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAppState(
    {
      onForeground,
    },
    [onForeground],
  );

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

  return (
    <>
      <ScrollView
        style={{ backgroundColor: '#fdedd6' }}
        showsVerticalScrollIndicator={false}>
        <>
          <View style={{ width: '100%', height: scale(200) }}>
            <Image
              source={HomeTopBg}
              style={{ height: scale(200), width: '100%' }}
              resizeMethod="resize"
              resizeMode="stretch"
            />
            <View
              style={{
                position: 'absolute',
                width: '80%',
                alignSelf: 'center',
                top: scale(40),
              }}>
              <SubTitle
                k="heading1"
                style={{
                  alignSelf: 'center',
                  fontWeight: '800',
                  fontSize: 22,
                  lineHeight: 19,
                  paddingTop: 10,
                }}
              />
              <SubTitle
                k="heading2"
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  lineHeight: 17,
                  paddingTop: 5,
                }}
              />
              <SubTitle
                k="heading3"
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  lineHeight: 19,
                  paddingTop: 5,
                }}
              />
            </View>
          </View>
          <CoursesCarousel
            withParallax
            height={280}
            title="courses"
            renderStaticBottomContent={() => (
              <Container
                style={{ marginTop: 20, width: '100%', alignSelf: 'center' }}
                flex={HEIGHT_RATIO.BOTTOM}>
                <Container flex={isLowResolution ? 1.8 : 1.5}>
                  <View className="flex flex-row items-end justify-between w-full pl-2 mb-1">
                    <ListTitle k="Greeting_general" />
                    <TouchableOpacity
                      onPress={() =>
                        onShowAll(i18n.t('Greeting_general'), data)
                      }>
                      <Text className="text-xs text-neutral-800 p-2">
                        {i18n.t('showAll')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <HorizontalList data={shuffleArray(data).slice(0, 5)} big />
                </Container>

                <View className="flex flex-row items-end justify-between w-full px-2 mt-4">
                  <ListTitle k="personalized" />
                </View>
                <View className="my-4 w-11/12 flex items-center">
                  <Feeling onClick={() => setIsOpen(true)} />
                </View>

                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <View className="flex flex-row items-end justify-between w-full px-2 mb-1">
                      <ListTitle k="צוות המורים" />
                    </View>
                    <InstructorList />
                  </Container>
                </Container>

                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <View className="flex flex-row items-end justify-between w-full pl-2 mb-1">
                      <ListTitle k="latest_release" />
                      <TouchableOpacity
                        onPress={() =>
                          onShowAll(i18n.t('latest_release'), latest)
                        }>
                        <Text className="text-xs text-neutral-800 p-2">
                          {i18n.t('showAll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <HorizontalList
                      data={shuffleArray(latest).slice(0, 5)}
                      big
                    />
                  </Container>
                </Container>
                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <View className="flex flex-row items-end justify-between w-full pl-2 mb-1">
                      <ListTitle k="most_played" />
                      <TouchableOpacity
                        onPress={() =>
                          onShowAll(i18n.t('most_played'), topRated)
                        }>
                        <Text className="text-xs text-neutral-800 p-2">
                          {i18n.t('showAll')}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <HorizontalList
                      data={shuffleArray(topRated).slice(0, 5)}
                      big
                    />
                  </Container>
                </Container>
                {articles.length > 0 && (
                  <Container
                    style={{ marginTop: 20 }}
                    flex={HEIGHT_RATIO.BOTTOM}>
                    <View className="px-2">
                      <ListTitle k="articles" />
                      <HorizontalList data={articles} renderUsing={Article} />
                    </View>
                  </Container>
                )}
              </Container>
            )}
          />
          {categories.map((category: any) => (
            <CategoryMeditations
              onShowAll={() => {
                onShowAll(i18n.t(category.title), category.meditations);
              }}
              key={category.id}
              category={category}
            />
          ))}
        </>
      </ScrollView>
      {showNotificationModal && (
        <ReminderPopup
          isVisible={showNotificationModal}
          dismiss={() => setshowNotificationModal(false)}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default Feed;
