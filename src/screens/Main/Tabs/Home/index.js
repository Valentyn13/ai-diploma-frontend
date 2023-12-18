import AboutCourse from '@common/components/AboutCourse';
import { BackIcon } from '@common/components/Styled';
import theme from '@common/theme';
import colors from '@common/theme/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18n from '@services/localization/i18n';
import React from 'react';

import CategoryDetails from './CategoryDetails';
import Home from './Home';
import InstructorDetail from './InstructorDetail';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
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

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={options}
      />
      <Stack.Screen
        name="AboutCourseForHome"
        component={AboutCourse}
        options={options}
      />
      <Stack.Screen
        name="InstructorDetail"
        component={InstructorDetail}
        options={{
          headerShown: true,
          headerBackImage: () => <BackIcon name="back_arrow" />,
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#FFF8EE',
            borderBottomColor: 'transparent',
            shadowOffset: { height: 0, width: 0 },
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
