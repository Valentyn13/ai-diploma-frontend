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

const Navigator = () => {
  useSyncUserData();

  return (
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
  );
};

export default Navigator;
