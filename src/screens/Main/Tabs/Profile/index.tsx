import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivacyPolicy from '@screens/Auth/TOS';
import React from 'react';

import Details from './Details';
import MyWay from './MyWay';
import Notifications from './Notifications';
import Settings from './Settings';

const DetailsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const SettingsNavigator: React.FC = () => {
  return (
    <DetailsStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <DetailsStack.Screen name="Settings" component={Settings} />
      <DetailsStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <DetailsStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen
        name="Details"
        component={Details}
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </DetailsStack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="MyWay"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="MyWay" component={MyWay} />
      <ProfileStack.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </ProfileStack.Navigator>
  );
};

export default TabNavigator;
