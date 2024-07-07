import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import PreLogin from './PreLogin';
import Register from './Register';
import TOS from './TOS';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  PrivacyPolicy: undefined;
  PreLogin: undefined;
  ForgotPassword: undefined;
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
      <AuthStack.Screen name="PrivacyPolicy" component={TOS} />
      <AuthStack.Screen name="PreLogin" component={PreLogin} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};
