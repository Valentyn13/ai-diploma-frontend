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
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Reply,
  Send,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useChat } from 'react-native-vercel-ai';

const generateUUID = () => CryptoJS.lib.WordArray.random(128 / 8).toString();
const API_URL = 'https://chat.rega.co.il/api/chat';

export default function Chat({
  route: { params },
}: {
  route: { params: { id: string; isNew: boolean } };
}) {
  const ref = useRef<FlatList<IMessage>>(null);
  const {
    user: { id: userId },
  } = useUser();
  const { sessions } = useSessions();
  const { hasPremium } = usePurchases();
  const navigation = useNavigation();
  const { chat } = useChatSession(params.id, params?.isNew);

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
    ref.current?.scrollToEnd({ animated: true });
  };

  const shouldShowPaywall = useMemo(
    () => !hasPremium && chatMsgs.length > 6,
    [chatMsgs.length, hasPremium],
  );

  const handleQuickReply = (replies: Reply[]) => {
    const item = sessions.find(({ id }) => id === replies[0].value);

    if (item) {
      // @ts-ignore
      navigation.navigate('MeditationPlayer', { item });
      return;
    }

    const messagesToAdd = replies.map((reply, index) => ({
      _id: `${index}-${Date.now()}`,
      text: removeEmojiesFromString(reply.title),
      createdAt: new Date(),
      user: {
        _id: 'USER',
      },
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
        quickReplies: {
          type: 'radio',
          values,
        },
      };
    }

    return msgs;
  }, [chatMsgs, extractSessionIds, sessions]);

  const insets = useSafeAreaInsets();

  return (
    <View className="w-full h-full">
      {/* workaround to trigger paywall - onSend function isn't updated on re-renders */}
      {shouldShowPaywall && (
        <Pressable
          className="absolute top-0 left-0 w-full h-full z-10"
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Main', {
              screen: 'Subscribe',
            });
            return;
          }}
        />
      )}

      <GiftedChat
        disableComposer={isLoading}
        bottomOffset={Platform.OS === 'ios' ? insets.bottom + 64 : 0}
        messageContainerRef={ref}
        messagesContainerStyle={{
          backgroundColor: theme.colors.light,
          paddingVertical: 0,
        }}
        renderUsernameOnMessage={true}
        scrollToBottom
        inverted={false}
        isTyping={isLoading}
        messages={messages}
        onQuickReply={handleQuickReply}
        onSend={messages => onSend(messages)}
        placeholder="הכנס הודעה..."
        user={{
          _id: 'USER',
        }}
        quickReplyStyle={{
          backgroundColor: 'transparent',
          borderColor: '#D0D0D0',
          borderBottomWidth: 2,
          borderTopColor: '#D0D0D0',
          borderBottomColor: '#D0D0D0',
          borderLeftColor: '#D0D0D0',
          borderRightColor: '#D0D0D0',
          width: 224,
          maxWidth: 224,
        }}
        quickReplyTextStyle={{
          color: '#0C0C0C',
          textAlign: 'left',
          direction: 'rtl',
        }}
        alwaysShowSend
        renderSend={props => (
          <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <View className="rotate-[228deg] mr-4">
              <Icon name="send" color={theme.colors.primary} size={24} />
            </View>
          </Send>
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              justifyContent: 'flex-end',
              paddingBottom: 0,
            }}
            // @ts-ignore
            textInputStyle={{
              textAlign: 'right',
              direction: 'rtl',
              color: 'black',
              lineHeight: 20,
            }}
          />
        )}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                  textAlign: 'left',
                },
                left: {
                  textAlign: 'left',
                },
              }}
              wrapperStyle={{
                right: {
                  backgroundColor: theme.colors.primary,
                  marginVertical: 4,
                },
                left: {
                  backgroundColor: '#FFEFD7',
                  marginVertical: 4,
                },
              }}
            />
          );
        }}
      />
    </View>
  );
}
