import { SubTitle } from '@common/components/Styled';
import colors from '@common/theme/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import styled from 'styled-components';

import Details from './Details';
import MyWay from './MyWay';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabBarLabel = styled(SubTitle).attrs(({ k }) => ({ k }))`
  font-family: ${({ focused, theme: { fonts } }) =>
    focused ? fonts.black : fonts.regular};
  width: 80;
  text-align: center;
`;

const StackNavigator = () => {
  return (
    <Stack.Navigator mode="modal" headerShown="false">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
      }}>
      <Tab.Screen
        name="MyWay"
        component={MyWay}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel k="myWay" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel k="details" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel k="settings" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  return <TabNavigator />;
};

export default AppContainer;
