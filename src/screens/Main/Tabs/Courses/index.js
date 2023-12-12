import AboutCourse from '@common/components/AboutCourse';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import i18n from '@services/localization/i18n';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Courses from './Courses';

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
    Courses: {
      screen: Courses,
      navigationOptions: navigtaionOption,
    },

    AboutCourse: {
      screen: AboutCourse,
      navigationOptions: navigtaionOption,
    },
  },
  {
    headerMode: 'screen',
    mode: 'modal',
  },
);

export default createAppContainer(StackNavigator);
