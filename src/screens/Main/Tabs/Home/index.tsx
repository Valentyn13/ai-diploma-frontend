import Header from '@common/components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Feed from './Feed';
import InstructorDetail from './InstructorDetail';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InstructorDetail"
        component={InstructorDetail}
        options={{
          header: () => <Header title="" className="bg-[#FFF7EA]" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
