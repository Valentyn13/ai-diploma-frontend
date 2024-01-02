import Header from '@common/components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Feed from './Feed';
import Instructor from './Instructor';

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
        name="Instructor"
        component={Instructor}
        options={{
          header: () => <Header className="absolute bg-transparent" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
