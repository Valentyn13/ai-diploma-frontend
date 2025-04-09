import SmilesSvgIcon from '@common/assets/icons/SmilesSvgIcon';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Feeling = ({ onClick = () => {}, isMale = true }) => (
  <TouchableOpacity
    onPress={onClick}
    className="w-full h-16 rounded-xl flex-row justify-between px-4 items-center border border-[#4B5EA1CF] bg-[#F0EBEC]">
    <View className="flex-1 flex-row items-center gap-[11px]">
      <View className="w-[37px] h-[37px] rounded-full bg-[#586DB7] items-center justify-center">
        <SmilesSvgIcon />
      </View>
      <Text className="text-[#4B5EA1] font-medium text-[18px] leading-[21px]">
        Який в тебе настрій?
      </Text>
    </View>
    <Icon name="chevron-right" size={25} color="#4B5EA1CF" />
  </TouchableOpacity>
);

export default Feeling;
