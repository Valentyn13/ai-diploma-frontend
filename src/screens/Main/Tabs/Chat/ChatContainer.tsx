import Chat from '@common/components/Chat';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useChat } from '@services/hooks/useChat';
import useChatSession from '@services/hooks/useChatSession';
import useStreamText from '@services/hooks/useStreamText';
import { useUser } from '@services/hooks/useUser';
import { useChatsStore } from '@store/useChatsStore';
import {
  SYSTEM_USER,
  getFirstMsgs,
  mapIMessageToMessage,
  mapMessageToIMessage,
} from '@utils/chat';
import React, { useEffect, useMemo, useState } from 'react';
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

  const { chats, currentChatId, setCurrentChatId, updateChatStreaming } =
    useChatsStore(state => ({
      chats: state.chats,
      currentChatId: state.currentChatId,
      setCurrentChatId: state.setCurrentChatId,
      updateChatStreaming: state.updateChatStreaming,
    }));

  const calculatedChatId = chatIdFromDrawer || (isNew ? null : currentChatId);

  const [sessionStarted, setSessionStarted] = useState(false);

  const {
    user: { id: userId, name, sex },
  } = useUser();

  const { hasPremium } = usePurchases();

  const { chat, loading, error } = useChatSession(chatIdFromDrawer);

  const { messages, isMessageLoading, updateMessages, addMessage } = useChat({
    userId,
    chatId: calculatedChatId,
  });

  const chatStreamStatus = useMemo(() => {
    const currentChat = chats.find(chat => chat.chatId === calculatedChatId);
    return currentChat?.needStreaming || false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const streamLastMessage = sessionStarted || chatStreamStatus;

  useEffect(() => {
    if (calculatedChatId) {
      updateChatStreaming(calculatedChatId);
    }
  }, [calculatedChatId, updateChatStreaming]);

  const shouldShowPaywall = useMemo(() => !hasPremium, [hasPremium]);

  const messagesToShowInChat = useMemo(
    () => (messages.length ? messages : getFirstMsgs(name, sex)),
    [messages, name, sex],
  );

  const sysLastMsg = useMemo(() => {
    const lastIMessage = messages[messages.length - 1];
    if (!lastIMessage) {
      return undefined;
    }
    const lastMsg = mapIMessageToMessage(lastIMessage);
    return lastMsg?.role === 'assistant' && streamLastMessage
      ? lastMsg
      : undefined;
  }, [messages, streamLastMessage]);

  const streamedText = useStreamText({
    text: sysLastMsg?.content || '',
    shouldStart: streamLastMessage,
  });

  const streamedMsgs = useMemo(
    () =>
      messagesToShowInChat.map((msg, index) => {
        if (
          index === messagesToShowInChat.length - 1 &&
          msg.user._id === SYSTEM_USER._id &&
          streamLastMessage
        ) {
          return { ...msg, text: streamedText };
        }
        return msg;
      }),
    [messagesToShowInChat, streamLastMessage, streamedText],
  );

  const onSend = (msgs: IMessage[] = []) => {
    setSessionStarted(true);
    const msg = mapIMessageToMessage(msgs[0]);
    addMessage(msg);
  };

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
      messages={streamedMsgs}
      onSend={onSend}
      isLoading={isMessageLoading}
      shouldShowPaywall={shouldShowPaywall}
      navigation={navigation}
    />
  );
}
