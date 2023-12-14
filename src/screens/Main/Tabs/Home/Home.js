/* eslint-disable react-native/no-inline-styles */
import HomeTopBg from '@common/assets/images/HomeTopBg.png';
import CategoryMeditations from '@common/components/CategoryMeditations';
import CoursesCarousel from '@common/components/CoursesCarousel';
import { HEIGHT_RATIO } from '@common/components/CoursesCarouselItem';
import HorizontalList from '@common/components/HorizontalList';
import {
  Container,
  DashedSeparator,
  Icon,
  Separator,
  SubTitle,
  TopTitle,
} from '@common/components/Styled';
import { SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON } from '@common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import useArticleData from '@services/hooks/useArticleData';
import usePurchases from '@services/hooks/usePurchases';
import { logEvent } from '@utils/analytics';
import isLowResolution from '@utils/isLowResolution';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffShowReminderPopup } from 'store/actions';
import {
  homeCategoriesSelector,
  homeMeditationsSelector,
  latestMeditationSelector,
  toptMeditationSelector,
} from 'store/selectors';
import styled from 'styled-components';

import Article from './Article';
import InstructorList from './InstructorList';
import ReminderPopup from './ReminderPopup';

const InfoContainer = styled.View`
  align-self: stretch;
  align-items: flex-start;
  flex: 1;
`;

const InfoWrapper = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding: 5px;
`;

const InfoContent = styled.View`
  align-self: stretch;
  flex: 1;
  align-items: flex-start;
`;

const Status = styled(SubTitle)`
  margin-top: 8px;
  margin-right: 8px;
  margin-left: 8px;
  text-align: left;
`;

const IconWrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ListTitle = styled(SubTitle)`
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
`;

const Info = () => {
  const { name } = useSelector(state => state.userDetails);
  const greeting = `${name}היי `;
  return (
    <InfoContainer>
      <SubTitle k="myMoments" />
      <Separator />
      <InfoWrapper>
        <InfoContent>
          <TopTitle k={greeting} />
          <Status k="dailyStatus" />
        </InfoContent>
        <IconWrapper>
          <Icon name="badge" size={isLowResolution ? 50 : 64} />
        </IconWrapper>
      </InfoWrapper>
      <DashedSeparator />
    </InfoContainer>
  );
};

const Home = () => {
  const route = useRoute();
  const { getAppData } = useAppData();
  const { getArticleData } = useArticleData();
  const navigation = useNavigation();
  const { email } = useSelector(state => state.userDetails);
  const { articles } = useSelector(state => state.articleData);
  const { hasPremium, setPurchaserIdentity, identify } = usePurchases();
  const navigateToItem = route.params?.navigateToItem;
  const [isfocus, setIsFocus] = useState(false);
  const [showNotificationModal, setshowNotificationModal] = useState(false);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const meditations = useSelector(homeMeditationsSelector);
  const latest = useSelector(latestMeditationSelector);
  const topRated = useSelector(toptMeditationSelector);
  const { shouldShowReminderPopup } = useSelector(state => state.userProgress);
  const categories = useSelector(homeCategoriesSelector);
  categories.sort((a, b) => a.order - b.order);

  const navigateToRelatedScreen = useCallback(async () => {
    const secondTime = await AsyncStorage.getItem('secondTime');
    if (!secondTime) {
      AsyncStorage.setItem('secondTime', 'true');
    } else if (!hasPremium && secondTime) {
      // console.log(' navigate from here', hasPremium);
      navigation.navigate('Subscribe');
    } else if (navigateToItem) {
      navigation.navigate('MeditationPlayer', {
        item: navigateToItem,
        autoPlay: true,
      });
      // } else {
      //   navigation.navigate('Home');
    }
  }, [hasPremium, navigateToItem, navigation]);

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
      setPurchaserIdentity();
      setData(meditations);
      setIsFocus(true);
      if (
        shouldShowReminderPopup === SHOULD_SHOW_REMINDER_POPUP_STATUS_TURNED_ON
      ) {
        notificationModal();
      }
      return () => setIsFocus(false);
    }, [
      setPurchaserIdentity,
      meditations,
      shouldShowReminderPopup,
      notificationModal,
    ]),
  );

  useEffect(() => {
    navigateToRelatedScreen();
  }, [hasPremium, identify, navigateToRelatedScreen]);

  useEffect(() => {
    if (navigateToItem) {
      navigation.navigate('MeditationPlayer', {
        item: navigateToItem,
        autoPlay: true,
      });
    }
  }, [navigateToItem, hasPremium, navigation]);

  useEffect(() => {
    if (email) {
      setPurchaserIdentity();
    }
  }, [email]);

  useAppState(
    {
      onForeground,
    },
    [onForeground],
  );

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);

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
            height={280}
            title="courses"
            isTest
            renderStaticBottomContent={() => (
              <Container
                style={{ marginTop: 20, width: '100%', alignSelf: 'center' }}
                flex={HEIGHT_RATIO.BOTTOM}>
                <Container flex={isLowResolution ? 1.8 : 1.5}>
                  <ListTitle k="Greeting_general" />
                  <HorizontalList data={data && data} big />
                </Container>
                {/* instructor list  */}

                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <ListTitle k="צוות המורים" />
                    <InstructorList />
                  </Container>
                </Container>

                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <ListTitle k="latest_release" />
                    <HorizontalList data={latest} big />
                  </Container>
                </Container>
                <Container style={{ marginTop: 20 }} flex={HEIGHT_RATIO.BOTTOM}>
                  <Container flex={isLowResolution ? 1.8 : 1.5}>
                    <ListTitle k="most_played" />
                    <HorizontalList data={topRated} big />
                  </Container>
                </Container>
                {articles.length > 0 && (
                  <Container
                    style={{ marginTop: 20 }}
                    flex={HEIGHT_RATIO.BOTTOM}>
                    <Container flex={isLowResolution ? 1.8 : 1.5}>
                      <ListTitle k="articles" />
                      <HorizontalList data={articles} renderUsing={Article} />
                    </Container>
                  </Container>
                )}
              </Container>
            )}
          />
          {categories.map(category => (
            <CategoryMeditations key={category.id} category={category} />
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

export default Home;
