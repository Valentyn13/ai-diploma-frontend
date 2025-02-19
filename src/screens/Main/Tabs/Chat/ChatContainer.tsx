import Chat from '@common/components/Chat';
import { AMPLITUDE_EVENTS } from '@common/constants';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useChat } from '@services/hooks/useChat';
import useChatSession from '@services/hooks/useChatSession';
import useOverrideBackGesture from '@services/hooks/useOverrideBackGesture';
import { useUser } from '@services/hooks/useUser';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import {
  getFirstMsgs,
  mapIMessageToMessage,
  mapMessageToIMessage,
} from '@utils/chat';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';

export default function ChatContainer() {
  const navigation = useNavigation();

  const {
    chats,
    currentChatId,
    isSessionStarted,
    setSessionStarted,
    setNavCallback,
    setIsLeaveModalVisible,
  } = useChatsStore(state => ({
    chats: state.chats,
    currentChatId: state.currentChatId,
    isSessionStarted: state.isSessionStarted,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    setSessionStarted: state.setSessionStarted,
  }));

  const {
    lastActiveSessionId,
    selectedCategory,
    setCurrentStep,
    setLatestActiveSessionId,
  } = useCategorizedChatFlowStore(state => ({
    lastActiveSessionId: state.lastActiveSessionId,
    selectedCategory: state.selectedCategory,
    setCurrentStep: state.setCurrentStep,
    setLatestActiveSessionId: state.setLatestActiveSessionId,
  }));

  const {
    user: { id: userId, name, sex },
  } = useUser();

  const { chat, loading, error } = useChatSession(currentChatId);

  const {
    messages,
    isMessageLoading,
    disableUserInput,
    updateMessages,
    addMessage,
  } = useChat({
    userId,
    chatId: currentChatId,
  });
  const shouldShowPaywall = useMemo(() => false, []);
  const messagesToShowInChat = useMemo(
    () =>
      messages.length
        ? messages
        : getFirstMsgs(
            name,
            sex,
            selectedCategory,
            chats.filter(c => c.category === selectedCategory).length,
          ),
    [messages, name, sex, selectedCategory, chats],
  );

  const onSend = (msgs: IMessage[] = []) => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_SEND_MESSAGE);
    const msg = mapIMessageToMessage(msgs[0]);
    addMessage(msg);

    if (currentChatId !== lastActiveSessionId) {
      setLatestActiveSessionId(currentChatId);
    }

    if (messages.length >= 10) {
      setSessionStarted(false);
      return;
    }
    setSessionStarted(true);
  };

  useOverrideBackGesture({
    onBack: () => {
      logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.PRESSED_BACK_BUTTON('chat'));
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
    },
  });

  useEffect(() => {
    const iMessagesFromIncomingChatMessages =
      chat.messages.map(mapMessageToIMessage);
    updateMessages(iMessagesFromIncomingChatMessages);
  }, [chat, updateMessages]);

  useEffect(() => {
    if (!currentChatId) {
      updateMessages([]);
    }
  }, [currentChatId, updateMessages]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF7EA] w-full h-full">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF7EA] w-full h-full">
        <Text>אירעה שגיאה</Text>
      </View>
    );
  }

  return (
    <Chat
      disableUserInput={disableUserInput}
      messages={messagesToShowInChat}
      onSend={onSend}
      isLoading={isMessageLoading}
      shouldShowPaywall={shouldShowPaywall}
      navigation={navigation}
    />
  );
}
