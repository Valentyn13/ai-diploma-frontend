import { deleteChat } from '@services/api/chat';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { getReadableTimeDifference } from '@utils/time';
import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ChatForDrawer } from 'types/Chat';

const DrawerItem = ({ chat }: { chat: ChatForDrawer }) => {
  const { setIsDrawerOpen } = useCategorizedChatFlowStore(state => ({
    setIsDrawerOpen: state.setIsDrawerOpen,
  }));

  const {
    currentChatId,
    isSessionStarted,
    setIsDeleteModalVisible,
    setNavCallback,
    setIsLeaveModalVisible,
    setCurrentChatId,
    setDeleteCallback,
    removeChat,
  } = useChatsStore(state => ({
    currentChatId: state.currentChatId,
    setIsDeleteModalVisible: state.setIsDeleteModalVisible,
    isSessionStarted: state.isSessionStarted,
    setCurrentChatId: state.setCurrentChatId,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    setDeleteCallback: state.setDeleteCallback,
    removeChat: state.removeChat,
  }));

  const isActive = chat.chatId === currentChatId;

  const handlePress = () => {
    const cb = () => {
      setIsDrawerOpen(false);
      setCurrentChatId(chat.chatId);
    };
    if (isSessionStarted) {
      setNavCallback(cb);
      setIsLeaveModalVisible(true);
      return;
    }

    cb();
  };

  const handleDeleteChat = () => {
    const cb = async () => {
      removeChat(chat.chatId);
      await deleteChat(chat.chatId);
    };
    setDeleteCallback(cb);
    setIsDeleteModalVisible(true);
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      activeOpacity={1}
      underlayColor="#00000015"
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: '#00000020',
        },
        isActive && {
          backgroundColor: 'rgba(0, 122, 255, 0.12)',
        },
      ]}
      className="py-[16px] px-[15px]">
      <View className="flex-row items-center justify-between">
        <Text
          numberOfLines={1}
          className="text-black text-left flex-1 font-normal text-md">
          {chat.firstMessageContent}
        </Text>
        <View className="flex-row gap-[12px] items-center pl-[5px]">
          <Text className="text-black font-light text-xs">
            {getReadableTimeDifference(chat.firstMessageTimestamp)}
          </Text>
          <TouchableOpacity className="" onPress={handleDeleteChat}>
            <Icon color="#00000080" name="trash" size={19} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default DrawerItem;
