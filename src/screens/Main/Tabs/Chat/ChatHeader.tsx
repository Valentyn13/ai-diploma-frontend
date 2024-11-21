import GlitterIcon from '@common/components/common/Glitter';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import React, { FC } from 'react';
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
    isLeaveModalVisible,
    navCallback,
    isSessionStarted,
    setNavCallback,
    setIsLeaveModalVisible,
    setSessionStarted,
  } = useChatsStore(state => ({
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
    setSessionStarted(false);
    setIsLeaveModalVisible(false);
    if (navCallback) {
      navCallback();
      setNavCallback(null);
    }
  };

  const handleGoBack = () => {
    if (isSessionStarted) {
      setIsLeaveModalVisible(true);
      if (!selectedCategory) {
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
    setCurrentStep('list');
  };

  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            toggleDrawer(true);
          }}>
          <Icon color="#000" name="menu" size={30} />
        </TouchableOpacity>
        <View className="flex-row items-center ml-6">
          <Image source={avatarSrc} className="w-8 h-8 rounded-full" />
          <Text className="text-black font-normal text-xl ml-2">{title}</Text>
          <GlitterIcon className="w-6 h-6 ml-1" />
        </View>
      </View>
      <GoBackButton onPress={handleGoBack} />

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
