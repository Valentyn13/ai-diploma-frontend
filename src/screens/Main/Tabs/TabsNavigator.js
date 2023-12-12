import { Icon, SubTitle } from '@common/components/Styled';
import colors from '@common/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';

import Courses from './Courses';
import MainHome from './Home';
import Meditations from './Meditations';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabBarLabel = styled(SubTitle)`
  text-align: center;
  margin-top: 5px;
  padding-top: ${Platform.OS === 'android' ? '10px;' : '0px'};
`;

const TABS = { MainHome, Meditations, Courses, Profile };

const tabScreen = (name, screen) => ({
  tabBarLabel: () => <TabBarLabel>{name}</TabBarLabel>,
  tabBarIcon: ({ focused, color, size }) => (
    <Icon name={`${name}${focused ? 'On' : 'Off'}`} size={size} color={color} />
  ),
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        tabBarStyle: {
          paddingTop: Platform.OS === 'android' ? 20 : 10,
          borderTopWidth: 0,
          paddingBottom: 4,
          marginBottom: Platform.OS === 'ios' ? 18 : 0,
          backgroundColor: colors.bgColor,
        },
      }}>
      {/* TODO: fix icons and texts here */}
      {Object.entries(TABS).map(([key, value]) => (
        <Tab.Screen
          key={key}
          name={key}
          component={value}
          options={{
            backgroundColor: colors.bgColor,
            tabBarLabel: key,
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 10,
              letterSpacing: 0.58,
              textAlign: 'center',
              marginTop: '5px',
              paddingTop: `${Platform.OS === 'android' ? '10px;' : '0px'}`,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
