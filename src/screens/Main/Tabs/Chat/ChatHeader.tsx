import { CircleButton } from '@common/components/buttons/CircleButton';
import GlitterIcon from '@common/components/common/Glitter';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ChatHeader: FC<{
  title: string;
  avatarUri: string;
  onNew: () => void;
  navigation: any;
}> = ({ title, avatarUri, onNew, navigation }) => {
  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.toggleDrawer()}>
          <Icon color="#000" name="menu" size={30} />
        </TouchableOpacity>
        <View className="flex-row items-center ml-2">
          <Image source={{ uri: avatarUri }} className="w-8 h-8 rounded-full" />
          <Text className="text-black font-normal text-xl ml-2">{title}</Text>
          <GlitterIcon className="w-6 h-6 ml-1" />
        </View>
      </View>

      <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={onNew}
        size={40}
        icon="rotate-right"
      />
    </View>
  );
};

export default ChatHeader;
