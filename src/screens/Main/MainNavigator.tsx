import BGMusicPicker from '@common/components/BGMusicPicker';
import GroupedMeditations from '@common/components/GroupedMeditations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MeditationPlayer from './MeditationPlayer';
import BgPlayer from './MeditationPlayer/BgPlayer';
import Subscribe from './Subscribe';
import Tabs from './Tabs';
import WebView from './WebView';

export type MainStackParamList = {
  Tabs: undefined;
  MeditationPlayer: { item: any };
  GroupedMeditations: { title: any; meditations: any[] };
  Subscribe: undefined;
  WebView: { url: string; title: string };
  BGMusicPicker: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default () => {
  return (
    <>
      <BgPlayer />

      <MainStack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name="Tabs" component={Tabs} />
        <MainStack.Screen
          name="MeditationPlayer"
          component={MeditationPlayer}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="BGMusicPicker"
          component={BGMusicPicker}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <MainStack.Screen
          name="GroupedMeditations"
          component={GroupedMeditations}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Subscribe"
          component={Subscribe}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <MainStack.Screen
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
      </MainStack.Navigator>
    </>
  );
};
