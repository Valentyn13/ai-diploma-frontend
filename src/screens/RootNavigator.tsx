import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from '@screens/Auth/AuthNavigator';
import MainNavigator from '@screens/Main/MainNavigator';
import OnboardingNavigator from '@screens/Onboarding/OnboardingNavigator';
import Splash from '@screens/Splash';
import useSyncUserData from '@services/hooks/useSyncUserData';
import React from 'react';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['rega://'],
  config: {
    screens: {
      Home: 'home',
    },
  },
};

const Navigator = () => {
  useSyncUserData();

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
