import Divider from '@common/components/Divider';
import { ScrolledContainer } from '@common/components/Styled';
import React from 'react';
import { View } from 'react-native';

import Badges from './Badges';
import MyCollections from './MyCollections';
import SummaryInfo from './SummaryInfo';

const MyWay = () => (
  <View className="bg-[#fdedd6]">
    <ScrolledContainer>
      <SummaryInfo />
      <Badges />
      <Divider className="my-6" />
      <MyCollections />
    </ScrolledContainer>
  </View>
);

export default MyWay;
