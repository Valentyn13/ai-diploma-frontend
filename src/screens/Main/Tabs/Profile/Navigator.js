import { SubTitle } from '@common/components/Styled';
import colors from '@common/theme/colors';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import styled from 'styled-components';

import Details from './Details';
import MyWay from './MyWay';
import Settings from './Settings';

const TabBarLabel = styled(SubTitle).attrs(({ k }) => ({ k }))`
  /* font-weight does NOT work in android, use font-family instead */
  font-family: ${({ focused, theme: { fonts } }) =>
    focused ? fonts.black : fonts.regular};
  width: 80;
  text-align: center;
`;
const StackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerShown: false,
      },
    },

    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    headerMode: 'screen',
    mode: 'modal',
  },
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    MyWay: {
      screen: MyWay,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel k="myWay" {...{ focused }} />
        ),
      },
    },
    Details: {
      screen: Details,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel k="details" {...{ focused }} />
        ),
      },
    },
    StackNavigator: {
      screen: StackNavigator,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel k="settings" {...{ focused }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        backgroundColor: colors.bgColor,
        height: 40,
        marginTop: Platform.OS === 'ios' ? 40 : 10,
      },
      labelStyle: {
        color: colors.textColor,
      },
      style: {
        backgroundColor: colors.bgColor,
      },
      // indicatorStyle: {
      //   height: '50%',
      //   backgroundColor: colors.selectedTabBgColor,
      // },
      // indicatorStyle: {
      //   height: null,
      //   top: 0,
      //   backgroundColor: colors.selectedTabBgColor,
      // },
    },
  },
);
export default createAppContainer(TabNavigator);
