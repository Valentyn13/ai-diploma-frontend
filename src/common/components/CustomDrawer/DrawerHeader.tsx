import { AMPLITUDE_EVENTS } from '@common/constants';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const DrawerListHeader = () => {
  const { setIsDrawerOpen } = useCategorizedChatFlowStore(state => ({
    setIsDrawerOpen: state.setIsDrawerOpen,
  }));
  const {
    currentChatId,
    isSessionStarted,
    setNavCallback,
    setIsLeaveModalVisible,
    setCurrentChatId,
  } = useChatsStore(state => ({
    setCurrentChatId: state.setCurrentChatId,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    currentChatId: state.currentChatId,
    isSessionStarted: state.isSessionStarted,
  }));

  const handlePress = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_NEW_CHAT('chat'));
    const cb = () => {
      setIsDrawerOpen(false);
      setCurrentChatId(null);
    };
    if (isSessionStarted) {
      setNavCallback(cb);
      setIsLeaveModalVisible(true);
      return;
    }

    cb();
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: '#00000020',
        },
        !currentChatId && { backgroundColor: 'rgba(0, 122, 255, 0.12)' },
      ]}
      activeOpacity={1}
      underlayColor="#00000015"
      className="py-[16px] px-[12px]">
      <Text className="text-black text-left font-semibold text-md">
        Новий чат
      </Text>
    </TouchableHighlight>
  );
};

export default DrawerListHeader;
