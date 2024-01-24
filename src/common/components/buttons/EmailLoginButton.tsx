import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const EmailLoginButton: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => (
  <TouchableOpacity
    className="justify-center items-center w-11/12 py-3 px-7 bg-[#273051] rounded-lg flex-row"
    onPress={onPress}>
    <Icon
      name="mail"
      size={20}
      color="#fff"
      style={{ position: 'absolute', left: 10 }}
    />
    <Text className="text-[#fff] text-lg text-center font-bold">
      התחברו עם אימייל
    </Text>
  </TouchableOpacity>
);
