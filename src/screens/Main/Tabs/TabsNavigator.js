import { Icon, SubTitle } from '@common/components/Styled';
import colors from '@common/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';

import Courses from './Courses';
import Home from './Home';
import Meditations from './Meditations';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabBarLabel = styled(SubTitle)`
  text-align: center;
  margin-top: 5px;
  padding-top: ${Platform.OS === 'android' ? '10px;' : '0px'};
`;

const TABS = { Home, Meditations, Courses, Profile };

const tabScreen = (name, screen) => ({
  headerShown: false,
  tabBarLabel: () => <TabBarLabel>{name}</TabBarLabel>,
  tabBarIcon: ({ focused, color, size }) => (
    <Icon name={`${name}${focused ? 'On' : 'Off'}`} size={size} color={color} />
  ),
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        style: {
          paddingTop: Platform.OS === 'android' ? 20 : 10,
          borderTopWidth: 0,
          paddingBottom: 4,
          marginBottom: Platform.OS === 'ios' ? 18 : 0,
          backgroundColor: colors.bgColor,
        },
      }}>
      {Object.entries(TABS).map(([key, value]) => (
        <Tab.Screen
          key={key}
          name={key}
          component={value}
          options={tabScreen(key, value)}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
