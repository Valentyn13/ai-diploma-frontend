import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type EmailLoginButtonProps = {
  navigate: (screen: string) => void;
};

export const EmailLoginButton: React.FC<EmailLoginButtonProps> = ({
  navigate,
}) => (
  <TouchableOpacity
    className="justify-center items-center w-11/12 py-5 px-7 bg-gray-800 rounded-lg mt-2.5"
    onPress={() => navigate('Register')}>
    <Icon
      name="mail"
      size={22}
      color="#fff"
      style={{ position: 'absolute', left: 10 }}
    />
    <Text className="text-white text-lg text-center font-bold">
      המשיכו עם אימייל
    </Text>
  </TouchableOpacity>
);
