import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';

import Badges from './Badges';
import MyCollections from './MyCollections';
import UserMetrics from './UserMetrics';

const Title = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const MyWay = ({ navigation }) => {
  const { navigate } = useNavigation();

  return (
    <View className="bg-[#fdedd6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-end p-4">
          <CircleButton
            backgroundColor="#00000060"
            color="white"
            size={40}
            icon="gear"
            onPress={() => {
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
        <UserMetrics />
        <View className="my-3" />
        <Badges />
        <Divider className="my-6" />
        <MyCollections />
      </ScrollView>
    </View>
  );
};
export default MyWay;
