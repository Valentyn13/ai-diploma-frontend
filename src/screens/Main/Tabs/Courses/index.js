import AboutCourse from '@common/components/AboutCourse';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from '@services/localization/i18n';
import React from 'react';

import Courses from './Courses';

const navigtaionOption = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  headerBackTitleVisible: false,
  title: i18n.t('appName'),
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.bgColor,
    borderBottomColor: 'transparent',
    shadowOffset: { height: 0, width: 0 },
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.textColor,
    fontSize: 17,
    letterSpacing: 5.19,
  },
};

const Stack = createStackNavigator();

const CoursesStack = () => (
  <Stack.Navigator initialRouteName="Courses">
    <Stack.Screen
      name="Courses"
      component={Courses}
      options={navigtaionOption}
    />
    <Stack.Screen
      name="AboutCourse"
      component={AboutCourse}
      options={{
        ...navigtaionOption,
        headerTitle: i18n.t('aboutCourse'),
      }}
    />
  </Stack.Navigator>
);

export default CoursesStack;
