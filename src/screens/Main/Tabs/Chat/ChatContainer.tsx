import Chat from '@common/components/Chat';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useChat } from '@services/hooks/useChat';
import useChatSession from '@services/hooks/useChatSession';
import useOverrideBackGesture from '@services/hooks/useOverrideBackGesture';
import { useUser } from '@services/hooks/useUser';
import { useChatsStore } from '@store/useChatsStore';
import {
  getFirstMsgs,
  mapIMessageToMessage,
  mapMessageToIMessage,
} from '@utils/chat';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';

export default function ChatContainer({
  route: { params },
}: {
  route: {
    params: { id: string | null; isNew: boolean };
  };
}) {
  const navigation = useNavigation();

  const chatIdFromDrawer = params.id;
  const isNew = params.isNew;

  const {
    chats,
    currentChatId,
    isSessionStarted,
    setSessionStarted,
    setNavCallback,
    setIsLeaveModalVisible,
    setCurrentChatId,
    setChatSessionStartedAfterCreationToFalse,
  } = useChatsStore(state => ({
    chats: state.chats,
    currentChatId: state.currentChatId,
    isSessionStarted: state.isSessionStarted,
    setNavCallback: state.setNavCallback,
    setIsLeaveModalVisible: state.setIsLeaveModalVisible,
    setCurrentChatId: state.setCurrentChatId,
    setSessionStarted: state.setSessionStarted,
    setChatSessionStartedAfterCreationToFalse:
      state.setChatSessionStartedAfterCreationToFalse,
  }));

  const calculatedChatId = chatIdFromDrawer || (isNew ? null : currentChatId);

  const {
    user: { id: userId, name, sex },
  } = useUser();

  const { hasPremium } = usePurchases();

  const { chat, loading, error } = useChatSession(chatIdFromDrawer);

  const {
    messages,
    isMessageLoading,
    disableUserInput,
    updateMessages,
    addMessage,
  } = useChat({
    userId,
    chatId: calculatedChatId,
  });
  const shouldShowPaywall = useMemo(() => !hasPremium, [hasPremium]);
  const messagesToShowInChat = useMemo(
    () => (messages.length ? messages : getFirstMsgs(name, sex)),
    [messages, name, sex],
  );

  const isSessionStartedAfterCreation = useMemo(() => {
    const chatFromStore = chats.find(chat => chat.chatId === calculatedChatId);
    return chatFromStore?.sessionStartedAfterCreation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = (msgs: IMessage[] = []) => {
    const msg = mapIMessageToMessage(msgs[0]);
    addMessage(msg);
    if (messages.length >= 10) {
      setSessionStarted(false);
      return;
    }
    setSessionStarted(true);
  };

  useOverrideBackGesture({
    onBack: () => {
      if (isSessionStarted) {
        setIsLeaveModalVisible(true);
        setNavCallback(navigation.goBack);
      } else {
        navigation.goBack();
      }
    },
  });

  useEffect(() => {
    const iMessagesFromIncomingChatMessages =
      chat.messages.map(mapMessageToIMessage);
    updateMessages(iMessagesFromIncomingChatMessages);
  }, [chat, updateMessages]);

  useEffect(() => {
    if (isNew && !chatIdFromDrawer) {
      setCurrentChatId(null);
    }
    if (!isNew && calculatedChatId) {
      setCurrentChatId(calculatedChatId);
    }
  }, [isNew, chatIdFromDrawer, setCurrentChatId, calculatedChatId]);

  useEffect(() => {
    if (isSessionStartedAfterCreation) {
      setChatSessionStartedAfterCreationToFalse(calculatedChatId as string);
      setSessionStarted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
