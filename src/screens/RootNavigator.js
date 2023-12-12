import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import IntroRelax from 'screens/IntroRelax';
import Register from 'screens/Register';
import PreLogin from 'screens/PreLogin';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import Splash from './Splash';
import Login from './Login';
import Intro from './Intro';
import IntroSleep from './IntroSleep';
import IntroStudy from './IntroStudy';
import CategoriesSelector from './CategoriesSelector';
import Main from './Main';
import ChooseSex from './ChooseSex';
import PickExperience from './PickExperience';

const IntroScreensNavigator = createStackNavigator(
  {
    Intro: {
      screen: Intro,
    },
    IntroSleep: {
      screen: IntroSleep,
    },
    IntroStudy: {
      screen: IntroStudy,
    },
    IntroRelax: {
      screen: IntroRelax,
    },
    ChooseSex: {
      screen: ChooseSex,
    },
    CategoriesSelector: {
      screen: CategoriesSelector,
    },
    PickExperience: {
      screen: PickExperience,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    PreLogin: {
      screen: PreLogin,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: false,
      swipeEnabled: false,
      gestureDirection: 'horizontal-inverted',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'IntroStudy',
  },
);

const Navigator = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  IntroScreens: {
    screen: IntroScreensNavigator,
  },
  Main: {
    screen: Main,
  },
});

export default createAppContainer(Navigator);
