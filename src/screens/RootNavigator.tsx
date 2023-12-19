import { createStackNavigator } from '@react-navigation/stack';
import IntroRelax from '@screens/IntroRelax';
import PreLogin from '@screens/PreLogin';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import Register from '@screens/Register';
import useSyncUserData from '@services/hooks/useSyncUserData';
import React from 'react';

import CategoriesSelector from './CategoriesSelector';
import ChooseSex from './ChooseSex';
import Intro from './Intro';
import IntroSleep from './IntroSleep';
import IntroStudy from './IntroStudy';
import Login from './Login';
import Main from './Main';
import PickExperience from './PickExperience';
import Splash from './Splash';

const Stack = createStackNavigator();

const IntroScreensNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="IntroStudy"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="IntroSleep" component={IntroSleep} />
      <Stack.Screen name="IntroStudy" component={IntroStudy} />
      <Stack.Screen name="IntroRelax" component={IntroRelax} />
      <Stack.Screen name="ChooseSex" component={ChooseSex} />
      <Stack.Screen name="CategoriesSelector" component={CategoriesSelector} />
      <Stack.Screen name="PickExperience" component={PickExperience} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="PreLogin" component={PreLogin} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  useSyncUserData();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="IntroScreens" component={IntroScreensNavigator} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Navigator;
