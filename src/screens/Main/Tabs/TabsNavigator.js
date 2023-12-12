import { Icon, SubTitle } from '@common/components/Styled';
import colors from '@common/theme/colors';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styled from 'styled-components';

import Courses from './Courses';
import Home from './Home';
import Meditations from './Meditations';
import Profile from './Profile';

const TabBarLable = styled(SubTitle)`
  text-align: center;
  margin-top: 5px;
  padding-top: ${Platform.OS === 'android' ? '10px;' : '0px'};
`;

const TABS = { Home, Meditations, Courses, Profile };

const tabScreen = (name, screen) => ({
  screen,
  navigationOptions: {
    tabBarLabel: () => <TabBarLable k={name} />,
    tabBarIcon: ({ focused }) => (
      <Icon name={`${name}${focused ? 'On' : 'Off'}`} />
    ),
  },
});

const TabNavigator = createBottomTabNavigator(
  Object.entries(TABS).reduce(
    (tabs, [key, value]) => ({
      ...tabs,
      [key]: tabScreen(key.toLowerCase(), value),
    }),
    {},
  ),
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? 20 : 10,
        borderTopWidth: 0,
        paddingBottom: 4,
        marginBottom: Platform.OS === 'ios' ? 18 : 0,
        backgroundColor: colors.bgColor,
      },
    },
  },
);

export default createAppContainer(TabNavigator);
