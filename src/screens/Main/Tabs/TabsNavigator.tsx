import MeditationPicker from '@common/components/MeditationPicker';
import { Icon } from '@common/components/Styled';
import colors from '@common/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from '@services/localization/i18n';
import React from 'react';
import { StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Courses from './Courses/index2';
import Home from './Home';
import Meditations from './Meditations';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
const TABS = { Home, Meditations, Courses, Profile };

const tabScreen = (name: string) => ({
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <Animated.View
      style={{
        transform: [{ scale: focused ? 1.2 : 1 }],
      }}>
      <Icon
        name={`${name}${focused ? 'On' : 'Off'}`}
        size={size}
        color={color}
      />
    </Animated.View>
  ),
});

const TabNavigator = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.bgColor,
      }}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor={colors.bgColor}
      />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 64,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.bgColor,
            borderTopWidth: 1,
            borderTopColor: colors.selectedTabBgColor,
          },
          tabBarInactiveTintColor: colors.selectedTabBgColor,
          tabBarActiveTintColor: colors.mainColor,
        }}>
        {Object.entries(TABS).map(([key, value]) => (
          <Tab.Screen
            key={key}
            name={key}
            component={value}
            options={{
              tabBarItemStyle: {
                flex: 1,
                paddingBottom: 2,
                paddingTop: 2,
                height: 64,
              },
              ...tabScreen(key.toLowerCase()),
              tabBarLabel: i18n.t(`${key.toLowerCase()}`),
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 12,
                letterSpacing: 0.58,
                textAlign: 'center',
                marginBottom: 4,
              },
            }}
          />
        ))}
      </Tab.Navigator>
      <MeditationPicker />
    </SafeAreaView>
  );
};

export default TabNavigator;
