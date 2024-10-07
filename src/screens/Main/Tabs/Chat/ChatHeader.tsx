import GlitterIcon from '@common/components/common/Glitter';
import { deleteChat } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import React, { FC, useState } from 'react';
import { Modal } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type CloseIconProps = {
  onPress: () => void;
};

const DeleteButton = ({ onPress }: CloseIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-2">
      <Icon name="trash" size={22} />
    </TouchableOpacity>
  );
};

const ChatHeader: FC<{
  title: string;
  avatarSrc: number;
  navigation: any;
}> = ({ title, avatarSrc, navigation }) => {
  const { currentChatId, removeChat } = useChatsStore(state => ({
    currentChatId: state.currentChatId,
    removeChat: state.removeChat,
  }));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteChat = () => {
    if (currentChatId) {
      deleteChat(currentChatId);
      removeChat(currentChatId);
      setIsModalVisible(false);
    }
  };
  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.toggleDrawer()}>
          <Icon color="#000" name="menu" size={30} />
        </TouchableOpacity>
        <View className="flex-row items-center ml-2">
          <Image source={avatarSrc} className="w-8 h-8 rounded-full" />
          <Text className="text-black font-normal text-xl ml-2">{title}</Text>
          <GlitterIcon className="w-6 h-6 ml-1" />
        </View>
      </View>
      {currentChatId && (
        <DeleteButton onPress={() => setIsModalVisible(true)} />
      )}
      <Modal transparent visible={isModalVisible}>
        <View className="w-full h-full bg-[#00000060] justify-center items-center p-[20px]">
          <View className="p-[18px] rounded-lg bg-[#ffffff]">
            <Text className="text-black font-bold text-lg mb-[8px]">
              מחק צ'אט
            </Text>
            <Text className="text-black mb-[15px] text-base">
              האם אתה בטוח שברצונך למחוק את הצ'אט הזה?
            </Text>
            <View className="flex-row space-x-[40px]">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="px-[10px]">
                <Text className="text-lg text-blue-500">לא</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteChat}
                className="px-[10px]">
                <Text className="text-lg text-blue-500">כן</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatHeader;
