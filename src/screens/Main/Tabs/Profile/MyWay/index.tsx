import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import { stringToDate } from '@utils/string';
import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Badges from './Badges';
import MyCollections from './MyCollections';
import Strikes from './Strikes';
import UserMetrics from './UserMetrics';

const Title = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const Card: FC<PropsWithChildren> = ({ children }) => (
  <View className="rounded-lg p-4 bg-[#273051]/10">{children}</View>
);

const MyWay = ({ navigation }) => {
  const { navigate } = useNavigation();
  const { meditationsPracticed } = useSelector(state => state.userProgress);
  const dates = meditationsPracticed.map(m => stringToDate(m.timestamp));

  return (
    <View className="flex-1 bg-[#fdedd6] px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-end mt-4">
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
        <Title className="ml-4" t="הרגעים שלי" />
        <Card>
          <UserMetrics />
          <View className="my-3" />
          <Badges />
        </Card>
        <Divider className="my-6" />
        <Title className="ml-4" t="המסלול שלי" />
        <Card>
          <Strikes dates={dates} />
        </Card>
        <Divider className="my-6" />
        <MyCollections />
      </ScrollView>
    </View>
  );
};
export default MyWay;
