import AboutCourse from '@common/components/AboutCourse';
import { BackIcon } from '@common/components/Styled';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import i18n from '@services/localization/i18n';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoryDetails from './CategoryDetails';
import Home from './Home';
import InstructorDetail from './InstructorDetail';

const navigtaionOption = {
  headerShown: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  // headerShown: false,
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
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      },
    },
    CategoryDetails: {
      screen: CategoryDetails,
      navigationOptions: navigtaionOption,
    },
    AboutCourseForHome: {
      screen: AboutCourse,
      navigationOptions: navigtaionOption,
      // cardStyle: {
      //   backgroundColor: 'transparent',
      // },
    },
    InstructorDetail: {
      screen: InstructorDetail,
      navigationOptions: {
        headerShown: true,
        headerBackImage: () => <BackIcon name="back_arrow" />,
        headerBackTitleVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#FFF8EE',
          borderBottomColor: 'transparent',
          // height: isLowResolution ? 10 : 20,
          shadowOffset: { height: 0, width: 0 },
          // shadowColor: theme.colors.bgColor,
          elevation: 0,
        },
      },
    },
  },
  {
    headerMode: 'screen',
    // mode: 'modal',
  },
);

export default createAppContainer(StackNavigator);
