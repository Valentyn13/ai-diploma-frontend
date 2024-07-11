import theme from '@common/theme';
import useStreamText from '@services/hooks/useStreamText';
import React, { useMemo, useRef } from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';
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

interface ChatComponentProps {
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
  handleQuickReply: (replies: Reply[]) => void;
  isLoading: boolean;
  shouldShowPaywall: boolean;
  navigation: any;
}

const Chat: React.FC<ChatComponentProps> = ({
  messages,
  onSend,
  handleQuickReply,
  isLoading,
  shouldShowPaywall,
  navigation,
}) => {
  const ref = useRef<FlatList<IMessage>>(null);
  const insets = useSafeAreaInsets();

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);
  const streamedText = useStreamText(lastMessage?.text, 50);

  const computedMsgs = useMemo(() => {
    const newLocal = messages.map((msg, index) => {
      if (index === messages.length - 1 && msg.user._id !== 'USER') {
        return { ...msg, text: streamedText };
      }
      return msg;
    });

    return newLocal;
  }, [messages, streamedText]);

  return (
    <View className="w-full h-full bg-[#FFF7EA]">
      {shouldShowPaywall && (
        <Pressable
          className="absolute top-0 left-0 w-full h-full z-10"
          onPress={() => {
            navigation.navigate('Main', { screen: 'Subscribe' });
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
        scrollToBottom
        inverted={false}
        isTyping={isLoading}
        messages={computedMsgs}
        onQuickReply={handleQuickReply}
        onSend={messages => onSend(messages)}
        placeholder="הכנס הודעה..."
        user={{ _id: 'USER' }}
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
              <Icon
                name="send"
                color={isLoading ? '#D0D0D0' : theme.colors.primary}
                size={24}
              />
            </View>
          </Send>
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{ justifyContent: 'flex-end', paddingBottom: 0 }}
            // @ts-ignore
            textInputStyle={{
              textAlign: 'right',
              direction: 'rtl',
              color: 'black',
              lineHeight: 20,
            }}
          />
        )}
        renderBubble={props => (
          <Bubble
            {...props}
            textStyle={{
              right: { color: 'white', textAlign: 'left' },
              left: { textAlign: 'left' },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: theme.colors.primary,
                marginVertical: 4,
              },
              left: { backgroundColor: '#FFEFD7', marginVertical: 4 },
            }}
          />
        )}
      />
    </View>
  );
};

export default Chat;
