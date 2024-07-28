import Chat from '@common/components/Chat';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import useChatSession from '@services/hooks/useChatSession';
import useStreamText from '@services/hooks/useStreamText';
import { useUser } from '@services/hooks/useUser';
import {
  SYSTEM_USER,
  getFirstMsgs,
  mapIMessageToMessage,
  mapMessageToIMessage,
} from '@utils/chat';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import { IMessage } from 'react-native-gifted-chat';
import { useChat } from 'react-native-vercel-ai';

const generateUUID = () => CryptoJS.lib.WordArray.random(128 / 8).toString();
const API_URL = 'https://chat.rega.co.il/api/chat';

export default function ChatContainer({
  route: { params },
}: {
  route: { params: { id: string; isNew: boolean } };
}) {
  const {
    user: { id: userId, name, sex },
  } = useUser();
  const { hasPremium } = usePurchases();
  const navigation = useNavigation();
  const { chat, loading, error } = useChatSession(params.id, params?.isNew);
  const [sessionStarted, setSessionStarted] = useState(false);

  const {
    messages: chatMsgs,
    setMessages,
    append,
    isLoading,
  } = useChat({
    api: API_URL,
    body: {
      userId,
      sessionId: params.id,
    },
    headers: {
      'content-type': 'application/json',
    },
  });

  useEffect(() => {
    setMessages(chat.messages.map(m => ({ ...m, id: generateUUID() })));
  }, [chat.messages, setMessages]);

  const onSend = (msgs: IMessage[] = []) => {
    const msg = mapIMessageToMessage(msgs[0]);
    append(msg);
    setSessionStarted(true);
  };

  const shouldShowPaywall = useMemo(
    () => !hasPremium && chatMsgs.length > 6,
    [chatMsgs.length, hasPremium],
  );

  const sysLastMsg = useMemo(() => {
    const lastMsg = chatMsgs[chatMsgs.length - 1];
    return lastMsg?.role === 'assistant' && sessionStarted
      ? lastMsg
      : undefined;
  }, [chatMsgs, sessionStarted]);

  const streamedText = useStreamText(sysLastMsg?.content);

  const messages = useMemo(
    () =>
      chatMsgs.length
        ? chatMsgs.map(mapMessageToIMessage)
        : getFirstMsgs(name, sex),
    [chatMsgs, name, sex],
  );

  const streamedMsgs = useMemo(
    () =>
      messages.map((msg, index) => {
        if (
          index === messages.length - 1 &&
          msg.user._id === SYSTEM_USER._id &&
          sessionStarted
        ) {
          return { ...msg, text: streamedText };
        }
        return msg;
      }),
    [messages, sessionStarted, streamedText],
  );

  if (!params?.isNew && loading) {
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
      isLoading={isLoading}
      shouldShowPaywall={shouldShowPaywall}
      navigation={navigation}
    />
  );
}
