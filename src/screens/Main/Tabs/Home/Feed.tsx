import Collection from '@common/components/Collection';
import CoursesCarousel from '@common/components/CoursesCarousel';
import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
import {
  COLLECTIONS,
  COLLECTIONS_TIME_OF_DAY,
  SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON,
} from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useArticleData from '@services/hooks/useArticleData';
import { useOnboarding } from '@services/hooks/useOnboarding';
import { logEvent } from '@utils/analytics';
import { getCollectionIdByTime, getGreeting } from '@utils/time';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffShowReminderPopup } from 'store/actions';
import {
  allMeditations as allMeditationsSelector,
  homeCategoriesSelector,
  homeMeditationsSelector,
  latestMeditationSelector,
  toptMeditationSelector,
} from 'store/selectors';
import styled from 'styled-components/native';

import { useSheetStore } from '../../../../store/useSheetStore';
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
  const { email, name } = useSelector((state: any) => state.userDetails);
  const { articles } = useSelector((state: any) => state.articleData);
  const { setPurchaserIdentity, hasPremium } = usePurchases();
  const [showNotificationModal, setshowNotificationModal] = useState(false);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const meditations = useSelector(homeMeditationsSelector);
  const latest = useSelector(latestMeditationSelector);
  const topRated = useSelector(toptMeditationSelector);
  const allMeditations = useSelector(allMeditationsSelector);
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

  const colorList = [
    { offset: '0%', color: '#FCE8CD', opacity: '1' },
    { offset: '100%', color: '#513F73', opacity: '0.2' },
  ];

  const idToItem = (id: string) => allMeditations.find((m: any) => m.id === id);

  return (
    <>
      {/* <View className="absolute w-full h-full bottom-0">
        <LinearGradient colorList={colorList} angle={90} />
      </View> */}
      <ScrollView
        style={{
          backgroundColor: '#FCE8CD',
          position: 'relative',
        }}
        showsVerticalScrollIndicator={false}>
        <View className="px-2 mt-4 mb-12">
          <Text
            className="flex text-black text-3xl items-center justify-center text-left"
            style={{
              fontFamily: 'Almoni DL AAA',
            }}>
            היי, {name} 👋 {`\n${getGreeting()}`}
          </Text>
        </View>

        {/* <View className="absolute top-0 ml-auto">
          <Wobble />
        </View> */}

        {COLLECTIONS_TIME_OF_DAY.filter(
          ({ id }) => id === getCollectionIdByTime(),
        ).map((collection: any) => (
          <>
            <Collection
              key={collection.id}
              title={collection.title}
              items={collection.trackIds.map(idToItem).filter(Boolean)}
              onShowAll={() => {
                onShowAll(
                  collection.title,
                  collection.trackIds.map(idToItem).filter(Boolean),
                );
              }}
            />
            <Divider className="my-6" />
          </>
        ))}

        <CoursesCarousel
          withParallax
          height={280}
          title="courses"
          fullScreen={false}
        />
        <Divider className="my-6" />

        {COLLECTIONS.map((collection: any) => (
          <>
            <Collection
              key={collection.id}
              title={collection.title}
              items={collection.trackIds.map(idToItem).filter(Boolean)}
              onShowAll={() => {
                onShowAll(
                  collection.title,
                  collection.trackIds.map(idToItem).filter(Boolean),
                );
              }}
            />
            <Divider className="my-6" />
          </>
        ))}
        {/* {categories.map((category: any) => (
          <>
            <Collection
              onShowAll={() => {
                onShowAll(i18n.t(category.title), category.meditations);
              }}
              key={category.id}
              items={category.meditations}
              title={i18n.t(category.title)}
            />
            <Divider className="my-4" />
          </>
        ))} */}
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
