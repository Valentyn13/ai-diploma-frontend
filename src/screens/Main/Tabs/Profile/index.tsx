import { colors } from '@common/theme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import i18n from '@services/localization/i18n';
import React from 'react';

import Details from './Details';
import MyWay from './MyWay';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.bgColor,
          height: 40,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.darkColor,
          height: 3,
        },
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: 12,
          width: 80,
          textAlign: 'center',
          letterSpacing: 0.5,
        },
      }}>
      <Tab.Screen name={i18n.t('myWay')} component={MyWay} />
      <Tab.Screen name={i18n.t('details')} component={Details} />
      <Tab.Screen name={i18n.t('settings')} component={StackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
