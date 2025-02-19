import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '@screens/Auth/AuthNavigator';
import MainNavigator from '@screens/Main/MainNavigator';
import Splash from '@screens/Splash';
import React from 'react';

import OnBoarding from './Onboarding/OnBoarding';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['rega://', 'https://app.rega-app.com'],
  config: {
    screens: {
      Home: '/d/home',
    },
  },
};

const Navigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="Onboarding" component={OnBoarding} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
