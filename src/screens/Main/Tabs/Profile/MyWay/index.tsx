import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
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

const MyWay = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    className="bg-[#fdedd6]"
    contentContainerStyle={{
      marginTop: 20,
    }}>
    <Title className="ml-4" t="הרגעים שלי" />
    <UserMetrics />
    <View className="my-3" />
    <Badges />
    <Divider className="my-6" />
    <MyCollections />
  </ScrollView>
);

export default MyWay;
