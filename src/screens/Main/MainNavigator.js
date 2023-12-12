import { BackIcon } from '@common/components/Styled';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import i18n from '@services/localization/i18n';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Intro from '../Intro';
import MeditationInfo from './MeditationInfo';
import MeditationPlayer from './MeditationPlayer';
import Subscribe from './Subscribe';
import Subscribe2 from './Subscribe2';
import Tabs from './Tabs';
import WebView from './WebView';

const navigtaionOption = {
  headerShown: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  headerShown: false,
  title: i18n.t('appName'),
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.bgColor,
    borderBottomColor: 'transparent',
    shadowOffset: { height: 0, width: 0 },
    // shadowColor: theme.colors.bgColor,
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.textColor,
    fontSize: 17,
    letterSpacing: 5.19,
  },
};
const StackNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: navigtaionOption,
    },
    MeditationPlayer: {
      screen: MeditationPlayer,
      navigationOptions: {
        headerShown: false,
      },
    },
    MeditationInfo: {
      screen: MeditationInfo,
      navigationOptions: {
        headerShown: false,
      },
    },
    Subscribe: {
      screen: Subscribe,
      navigationOptions: {
        headerShown: false,
      },
    },
    Subscribe2: {
      screen: Subscribe2,
      navigationOptions: {
        headerShown: false,
      },
    },
    intro2: {
      screen: Intro,
    },
    WebView: {
      screen: WebView,
      navigationOptions: ({ navigation }) => ({
        headerShown: true,
        headerBackImage: () => <BackIcon name="back_arrow" />,
        headerBackTitleVisible: false,
        headerTitle: navigation.getParam('title'),
        headerStyle: {
          backgroundColor: '#FFF8EE',
          borderBottomColor: 'transparent',
          shadowOffset: { height: 0, width: 0 },
          elevation: 0,
        },
      }),
    },
  },
  {
    mode: 'modal',
  },
);

export default createAppContainer(StackNavigator);
