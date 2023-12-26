import GroupedMeditations from '@common/components/GroupedMeditations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Intro from '../Intro';
import MeditationPlayer from './MeditationPlayer';
import Subscribe from './Subscribe';
import Tabs from './Tabs';
import WebView from './WebView';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="MeditationPlayer"
        component={MeditationPlayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupedMeditations"
        component={GroupedMeditations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="intro2" component={Intro} />
      <Stack.Screen
        name="WebView"
        component={WebView}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          title: route.params?.title,
          headerStyle: {
            backgroundColor: '#FFF8EE',
            borderBottomColor: 'transparent',
            shadowOffset: { height: 0, width: 0 },
            elevation: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
