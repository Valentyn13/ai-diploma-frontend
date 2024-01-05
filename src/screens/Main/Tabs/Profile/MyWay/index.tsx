import Divider from '@common/components/Divider';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import Badges from './Badges';
import MyCollections from './MyCollections';
import UserMetrics from './UserMetrics';

const MyWay = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    className="bg-[#fdedd6]"
    contentContainerStyle={{
      marginTop: 20,
    }}>
    <UserMetrics />
    <Divider className="my-6" />
    <Badges />
    <Divider className="my-6" />
    <MyCollections />
  </ScrollView>
);

export default MyWay;
