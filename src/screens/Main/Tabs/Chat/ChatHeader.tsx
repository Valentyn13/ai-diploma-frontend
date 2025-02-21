import GlitterIcon from '@common/components/common/Glitter';
import { AMPLITUDE_EVENTS } from '@common/constants';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import React, { FC, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ConfirmationModal from './DeleteConfirmation';

type CloseIconProps = {
  onPress: () => void;
};

const GoBackButton = ({ onPress }: CloseIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-2">
      <Icon name="chevron-left" size={30} />
    </TouchableOpacity>
  );
};

const ChatHeader: FC<{
  title: string;
  avatarSrc: number;
  navigation: any;
  toggleDrawer: (isOpen: boolean) => void;
}> = ({ title, avatarSrc, toggleDrawer }) => {
  const {
    chats,
    isLeaveModalVisible,
    navCallback,
    isSessionStarted,
    setNavCallback,
    setIsLeaveModalVisible,
    setSessionStarted,
  } = useChatsStore(state => ({
    chats: state.chats,
    isLeaveModalVisible: state.isLeaveModalVisible,
    navCallback: state.navCallback,
    isSessionStarted: state.isSessionStarted,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    setSessionStarted: state.setSessionStarted,
  }));

  const { selectedCategory, setCurrentStep } = useCategorizedChatFlowStore(
    state => ({
      selectedCategory: state.selectedCategory,
      setCurrentStep: state.setCurrentStep,
    }),
  );

  const handleLeaveModalCancel = () => {
    setIsLeaveModalVisible(false);
  };

  const handleLeaveModalConfirm = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.CONFIRMED_LEAVE_CHAT);
    setSessionStarted(false);
    setIsLeaveModalVisible(false);
    if (navCallback) {
      navCallback();
      setNavCallback(null);
    }
  };

  const chatsToShowLength = useMemo(() => {
    const chatsInSelectedCategory = chats.filter(chat => {
      if (!selectedCategory && !chat.category) {
        return true;
      }
      return chat.category === selectedCategory;
    })
    return chatsInSelectedCategory.length;
  }, [chats, selectedCategory]);

  const handleGoBack = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_BACK_BUTTON('chat'));

    if (isSessionStarted) {
      setIsLeaveModalVisible(true);
      if (!selectedCategory) {
        setNavCallback(() => setCurrentStep('selection'));
        return;
      }

      if (!chatsToShowLength) {
        setNavCallback(() => setCurrentStep('selection'));
        return;
      }

      setNavCallback(() => setCurrentStep('list'));
      return;
    }
    if (!selectedCategory) {
      setCurrentStep('selection');
      return;
    }

    if (!chatsToShowLength) {
      setCurrentStep('selection');
      return;
    }
    setCurrentStep('list');
  };

  const handleToggleDrawer = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.OPENED_CHAT_DRAWER);
    toggleDrawer(true);
  };

  return (
    <View className="bg-[#FFF8EE] w-full flex-row items-center p-2 border-b border-gray-200">
      <View className="flex-row w-full justify-between">
        <GoBackButton onPress={handleGoBack} />
        <View className="flex-row">
          <View className="flex-row items-center mr-4">
            <Image source={avatarSrc} className="w-8 h-8 rounded-full" />
            <Text className="text-black text-xl ml-2">{title}</Text>
            <GlitterIcon className="w-6 h-6 ml-1" />
          </View>
          <TouchableOpacity className="p-2" onPress={handleToggleDrawer}>
            <Icon color="#000" name="menu" size={30} />
          </TouchableOpacity>
        </View>
      </View>
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
