import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Login from './Login';
import PreLogin from './PreLogin';
import PrivacyPolicy from './PrivacyPolicy';
import Register from './Register';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  PrivacyPolicy: undefined;
  PreLogin: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default () => {
  return (
    <AuthStack.Navigator
      initialRouteName="PreLogin"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AuthStack.Screen name="PreLogin" component={PreLogin} />
    </AuthStack.Navigator>
  );
};
