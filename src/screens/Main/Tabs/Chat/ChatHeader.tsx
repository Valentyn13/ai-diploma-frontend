import { CircleButton } from '@common/components/buttons/CircleButton';
import React from 'react';
import { Image, Text, View } from 'react-native';

const ChatHeader = ({ title, avatarUri, onNew }) => {
  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <Image source={{ uri: avatarUri }} className="w-10 h-10 rounded-full" />
        <Text className="text-black font-normal text-xl ml-2">{title}</Text>
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
