import Collection from '@common/components/Collection';
import CoursesCarousel from '@common/components/CoursesCarousel';
import Divider from '@common/components/Divider';
import Feeling from '@common/components/Feeling';
import Logo from '@common/components/Logo';
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
import i18n from '@services/localization/i18n';
import { logEvent } from '@utils/analytics';
import { shuffleArray } from '@utils/array';
import { getCollectionIdByTime } from '@utils/time';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { LinearGradient } from 'react-native-gradients';
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
import InstructorList from './InstructorList';
import ReminderPopup from './ReminderPopup';

const ListTitle = styled(SubTitle)`
  font-size: 22px;
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
    { offset: '50%', color: '#FCE8CD', opacity: '1' },
    { offset: '65%', color: '#FCE8CD', opacity: '0.1' },
    { offset: '100%', color: '#000', opacity: '0' },
  ];

  const idToItem = (id: string) => allMeditations.find((m: any) => m.id === id);

  return (
    <View className="h-full w-full bg-[#FCE8CD]">
      <ImageBackground
        source={require('./bg.jpg')}
        style={{
          position: 'absolute',
          flex: 1,
          height: '100%',
          width: '100%',
          top: -200,
        }}
      />
      <View className="absolute top-1 self-center">
        <Logo width={40} />
      </View>
      <ScrollView
        style={{
          zIndex: 10,
          backgroundColor: 'transparent',
          position: 'relative',
        }}
        showsVerticalScrollIndicator={false}>
        <View className="relative">
          <View className="absolute w-full h-full">
            <LinearGradient colorList={colorList} angle={90} />
          </View>
          <View className="h-80" />
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
        </View>

        <View className="bg-[#FCE8CD]">
          <View className="flex w-full items-center px-2 mt-4">
            <ListTitle k="personalized" />
            <View className="my-4 w-11/12 flex items-center">
              <Feeling onClick={() => setIsOpen(true)} />
            </View>
            <Divider className="my-6" />
          </View>

          <Collection
            title={i18n.t('Greeting_general')}
            items={data}
            onShowAll={() => {
              onShowAll(i18n.t('Greeting_general'), data);
            }}
          />
          <Divider className="my-6" />

          <Collection
            title={i18n.t('latest_release')}
            items={shuffleArray(latest)}
            onShowAll={() => {
              onShowAll(i18n.t('latest_release'), shuffleArray(latest));
            }}
          />
          <Divider className="my-6" />

          <View className="flex flex-row items-end justify-between w-full px-2 mb-1">
            <ListTitle k="צוות המורים" />
          </View>
          <InstructorList />
          <Divider className="my-6" />

          <Collection
            title={i18n.t('most_played')}
            items={shuffleArray(topRated)}
            onShowAll={() => {
              onShowAll(i18n.t('most_played'), shuffleArray(topRated));
            }}
          />
          <Divider className="my-6" />

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
        </View>
      </ScrollView>
      {showNotificationModal && (
        <ReminderPopup
          isVisible={showNotificationModal}
          dismiss={() => setshowNotificationModal(false)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Feed;
