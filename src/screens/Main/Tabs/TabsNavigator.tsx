import { Icon } from '@common/components/Styled';
import colors from '@common/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from '@services/localization/i18n';
import React from 'react';
import { Platform } from 'react-native';

import Courses from './Courses';
import Home from './Home';
import Meditations from './Meditations';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
const TABS = { Home, Meditations, Courses, Profile };

const tabScreen = (name: string) => ({
  // tabBarLabel: () => <TabBarLabel>{name}</TabBarLabel>,
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <Icon name={`${name}${focused ? 'On' : 'Off'}`} size={size} color={color} />
  ),
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: colors.bgColor,
        },
        tabBarInactiveTintColor: colors.selectedTabBgColor,
        tabBarActiveTintColor: colors.darkColor,
      }}>
      {/* TODO: fix icons and texts here */}
      {Object.entries(TABS).map(([key, value]) => (
        <Tab.Screen
          key={key}
          name={key}
          component={value}
          options={{
            ...tabScreen(key.toLowerCase()),
            tabBarLabel: i18n.t(`${key.toLowerCase()}`),
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 10,
              letterSpacing: 0.58,
              textAlign: 'center',
              marginBottom: 4,
              paddingTop: Platform.OS === 'android' ? 10 : 0,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
