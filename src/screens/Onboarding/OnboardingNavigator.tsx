import { createStackNavigator } from '@react-navigation/stack';
import CategoriesSelector from '@screens/Onboarding/CategoriesSelector';
import ChooseSex from '@screens/Onboarding/ChooseSex';
import Intro from '@screens/Onboarding/Intro';
import IntroRelax from '@screens/Onboarding/IntroRelax';
import IntroSleep from '@screens/Onboarding/IntroSleep';
import IntroStudy from '@screens/Onboarding/IntroStudy';
import PickExperience from '@screens/Onboarding/PickExperience';
import React from 'react';

export type OnboardingStackParamList = {
  Intro: undefined;
  IntroSleep: undefined;
  IntroStudy: undefined;
  IntroRelax: undefined;
  ChooseSex: undefined;
  CategoriesSelector: undefined;
  PickExperience: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

export default () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="IntroSleep"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <OnboardingStack.Screen name="Intro" component={Intro} />
      <OnboardingStack.Screen name="IntroSleep" component={IntroSleep} />
      <OnboardingStack.Screen name="IntroStudy" component={IntroStudy} />
      <OnboardingStack.Screen name="IntroRelax" component={IntroRelax} />
      <OnboardingStack.Screen name="ChooseSex" component={ChooseSex} />
      <OnboardingStack.Screen
        name="CategoriesSelector"
        component={CategoriesSelector}
      />
      <OnboardingStack.Screen
        name="PickExperience"
        component={PickExperience}
      />
    </OnboardingStack.Navigator>
  );
};
