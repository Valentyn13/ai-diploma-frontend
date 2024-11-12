import GlitterIcon from '@common/components/common/Glitter';
import { deleteChat } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import React, { FC, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ConfirmationModal from './DeleteConfirmation';

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
  const {
    currentChatId,
    isLeaveModalVisible,
    navCallback,
    setNavCallback,
    setIsLeaveModalVisible,
    setSessionStarted,
    removeChat,
  } = useChatsStore(state => ({
    currentChatId: state.currentChatId,
    isSessionStarted: state.isSessionStarted,
    isLeaveModalVisible: state.isLeaveModalVisible,
    navCallback: state.navCallback,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    removeChat: state.removeChat,
    setSessionStarted: state.setSessionStarted,
  }));

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDeleteChat = async () => {
    if (currentChatId) {
      await deleteChat(currentChatId);
      removeChat(currentChatId);
      setIsDeleteModalVisible(false);
      setSessionStarted(false);
    }
  };

  const handleLeaveModalCancel = () => {
    setIsLeaveModalVisible(false);
  };

  const handleLeaveModalConfirm = () => {
    setSessionStarted(false);
    setIsLeaveModalVisible(false);
    if (navCallback) {
      navCallback();
      setNavCallback(null);
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
        <DeleteButton onPress={() => setIsDeleteModalVisible(true)} />
      )}
      <ConfirmationModal
        type="delete"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteChat}
      />
      <ConfirmationModal
        type="leave"
        visible={isLeaveModalVisible}
        onCancel={handleLeaveModalCancel}
        onConfirm={handleLeaveModalConfirm}
      />
    </View>
  );
};

export default ChatHeader;
