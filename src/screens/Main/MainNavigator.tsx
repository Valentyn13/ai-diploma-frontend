import BGMusicPicker from '@common/components/BGMusicPicker';
import Collection from '@common/components/Collection';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Session } from 'types/Meditation';

import ExercisesPlayer from './ExercisesPlayer';
import Exercises from './ExercisesPlayer/Exercises';
import MeditationPlayer from './SessionPlayer';
import BgPlayer from './SessionPlayer/BgPlayer';
import Subscribe from './Subscribe';
import Tabs from './Tabs';
import Course from './Tabs/Courses/Course';
import SessionModal from './Tabs/Courses/SessionModal';
import Instructor from './Tabs/Home/Instructor';
import Instructors from './Tabs/Home/Instructors';
import WebView from './WebView';

export type MainStackParamList = {
  Tabs: undefined;
  MeditationPlayer: { item: any };
  Collection: { title: any; sessions: Session[] };
  Subscribe: undefined;
  WebView: { url: string; title: string };
  BGMusicPicker: undefined;
  Instructor: { instructor: any };
  Instructors: undefined;
  Course: { id: string };
  ExercisesPlayer: { id: string };
  Exercises: undefined;
  SessionModal: { id: string };
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
        <MainStack.Screen name="Instructors" component={Instructors} />
        <MainStack.Screen name="Course" component={Course} />
        <MainStack.Screen
          name="Instructor"
          component={Instructor}
          options={{
            presentation: 'modal',
          }}
        />
        <MainStack.Screen
          name="SessionModal"
          component={SessionModal}
          options={{
            presentation: 'modal',
          }}
        />
        <MainStack.Screen
          name="MeditationPlayer"
          component={MeditationPlayer}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
          }}
        />
        <MainStack.Screen
          name="BGMusicPicker"
          component={BGMusicPicker}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <MainStack.Screen
          name="Collection"
          component={Collection}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Exercises"
          component={Exercises}
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
        <MainStack.Screen
          name="ExercisesPlayer"
          component={ExercisesPlayer}
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
        <MainStack.Screen
          name="Subscribe"
          component={Subscribe}
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
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
