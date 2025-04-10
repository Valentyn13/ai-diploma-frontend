import BGMusicPicker from '@common/components/BGMusicPicker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BgPlayer from './SessionPlayer/BgPlayer';
import Tabs from './Tabs';
import WebView from './WebView';

export type MainStackParamList = {
  Tabs: undefined;
  MeditationPlayer: { item: any };
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
          name="BGMusicPicker"
          component={BGMusicPicker}
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
