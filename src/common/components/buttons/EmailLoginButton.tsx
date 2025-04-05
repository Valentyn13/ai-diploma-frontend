import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('screen');

export const EmailLoginButton: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => (
  <TouchableOpacity
    className="justify-center items-center py-3 bg-[#fff] rounded-lg flex-row"
    style={{
      gap: 8,
      width: width / 1.5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    }}
    onPress={onPress}>
    <Icon
      name="mail"
      size={20}
      color="#273051"
      style={{
        marginTop: 2,
      }}
    />
    <Text className="text-[#273051] text-lg text-center font-semibold">
      Увійти через пошту
    </Text>
  </TouchableOpacity>
);
