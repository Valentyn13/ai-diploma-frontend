import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootNavigatorParamList = {
  Splash: undefined;
  IntroScreens: undefined;
  Main: undefined;
};

export type SplashProps = NativeStackScreenProps<
  RootNavigatorParamList,
  'Profile'
>;
export type IntroScreensProps = NativeStackScreenProps<
  RootNavigatorParamList,
  'IntroScreens'
>;
export type MainProps = NativeStackScreenProps<RootNavigatorParamList, 'Main'>;

export type IntroScreensParamList = {
  Intro: undefined;
  IntroSleep: undefined;
  IntroStudy: undefined;
  IntroRelax: undefined;
  ChooseSex: undefined;
  CategoriesSelector: undefined;
  PickExperience: undefined;
  Login: undefined;
  Register: undefined;
  PrivacyPolicy: undefined;
  PreLogin: undefined;
};
