import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import { stringToDate } from '@utils/string';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Badges from './Badges';
import Card from './Card';
import MyCollections from './MyCollections';
import OneMChallenge from './OneMChallenge';
import Quote from './Quote';
import Strikes from './Strikes';
import UserMetrics from './UserMetrics';

const Title = styled(SubTitle)`
  font-size: 24;
  font-weight: bold;
`;

const LISTEN_TIME_URL = 'https://www.rega.co.il/api/listens/total';

const fetchChallengeProgress = async () => {
  let practivedMinutes = 202000;

  try {
    const res = await axios.get(LISTEN_TIME_URL);
    practivedMinutes = res.data.totalMinutes;
  } catch (error) {
    console.error('error fetching challenge progress', error);
  }

  return practivedMinutes;
};

const MyWay = () => {
  const { navigate } = useNavigation();
  const { meditationsPracticed, minutesPracticed } = useSelector(
    state => state.userProgress,
  );

  const dates = meditationsPracticed.map(m => stringToDate(m.timestamp));
  const [totalMinutesPracticed, setTotalMinutesMeditated] = useState(251240);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChallengeProgress();
      setTotalMinutesMeditated(data);
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-[#fdedd6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="absolute right-5 top-5">
          <CircleButton
            backgroundColor="#00000060"
            color="white"
            size={40}
            icon="gear"
            onPress={() => {
              // @ts-ignore
              navigate('Main', {
                screen: 'Tabs',
                params: {
                  screen: 'Profile',
                  params: { screen: 'SettingsNavigator' },
                },
              });
            }}
          />
        </View>
        <View className="px-5 mt-16">
          <Quote />
          <View className="mt-16" />
          <OneMChallenge
            userMinutes={minutesPracticed}
            totalMinutesPracticed={totalMinutesPracticed}
          />
          <Divider className="mb-6 mt-4" />

          <Title className="mb-5" t="הרגעים שלי" />
          <Card>
            <UserMetrics />
            <Divider className="b-[#160F29] border-opacity-30 w-1/2 self-center" />
            <Badges />
          </Card>
          <Divider className="mb-6 mt-4" />
        </View>
        <View className="px-5">
          <Title className="mb-5" t="המסלול שלי" />
          <Card>
            <Strikes dates={dates} />
          </Card>
          <Divider className="mb-6 mt-4" />
        </View>
        <View className="pb-4">
          <MyCollections />
        </View>
      </ScrollView>
    </View>
  );
};
export default MyWay;
