import Chat from '@common/components/Chat';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import useChatSession from '@services/hooks/useChatSession';
import useSessions from '@services/hooks/useSessions';
import { useUser } from '@services/hooks/useUser';
import {
  FIRST_MESSAGES,
  SYSTEM_USER,
  mapIMessageToMessage,
  mapMessageToIMessage,
  removeEmojiesFromString,
} from '@utils/chat';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import { Reply } from 'react-native-gifted-chat';
import { useChat } from 'react-native-vercel-ai';

const generateUUID = () => CryptoJS.lib.WordArray.random(128 / 8).toString();
const API_URL = 'https://chat.rega.co.il/api/chat';

export default function ChatContainer({
  route: { params },
}: {
  route: { params: { id: string; isNew: boolean } };
}) {
  const {
    user: { id: userId },
  } = useUser();
  const { sessions } = useSessions();
  const { hasPremium } = usePurchases();
  const navigation = useNavigation();
  const { chat, loading, error } = useChatSession(params.id, params?.isNew);

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
  };

  const shouldShowPaywall = useMemo(
    () => !hasPremium && chatMsgs.length > 6,
    [chatMsgs.length, hasPremium],
  );

  const handleQuickReply = (replies: Reply[]) => {
    const item = sessions.find(({ id }) => id === replies[0].value);

    if (item) {
      navigation.navigate('MeditationPlayer', { item });
      return;
    }

    const messagesToAdd = replies.map((reply, index) => ({
      _id: `${index}-${Date.now()}`,
      text: removeEmojiesFromString(reply.title),
      createdAt: new Date(),
      user: { _id: 'USER' },
    }));

    onSend(messagesToAdd);
  };

  const extractSessionIds = useCallback(
    (text: string) =>
      sessions
        .filter(session => text.includes(`"${session.name}"`))
        .map(session => session.id),
    [sessions],
  );

  const messages = useMemo(() => {
    if (!chatMsgs.length) {
      return FIRST_MESSAGES;
    }

    const msgs = chatMsgs.map(mapMessageToIMessage);
    const lastMsg = msgs[msgs.length - 1];

    if (lastMsg.user._id === SYSTEM_USER._id) {
      const ids = extractSessionIds(lastMsg.text);
      const values = sessions
        .filter(session => ids.includes(session.id))
        .map(({ name, id: value }) => ({
          title: `▶️ נגן את "${name}"`,
          value,
        }));

      msgs[msgs.length - 1] = {
        ...lastMsg,
        quickReplies: { type: 'radio', values },
      };
    }

    return msgs;
  }, [chatMsgs, extractSessionIds, sessions]);

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
      messages={messages}
      onSend={onSend}
      handleQuickReply={handleQuickReply}
      isLoading={isLoading}
      shouldShowPaywall={shouldShowPaywall}
      navigation={navigation}
    />
  );
}
