import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export const EmailLoginButton: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => (
  <TouchableOpacity
    className="justify-center items-center w-11/12 py-5 px-7 bg-white rounded-lg mt-2.5 flex-row"
    onPress={onPress}>
    <Icon
      name="mail"
      size={20}
      color="#000"
      style={{ position: 'absolute', left: 10 }}
    />
    <Text className="text-black text-lg text-center font-bold">
      התחברו עם אימייל
    </Text>
  </TouchableOpacity>
);
