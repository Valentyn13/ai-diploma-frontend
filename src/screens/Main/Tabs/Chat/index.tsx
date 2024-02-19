import {
  FIRST_MESSAGES,
  mapIMessageToMessage,
  mapMessageToIMessage,
  removeEmojiesFromString,
} from '@utils/chat';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather';
import { useChat } from 'react-native-vercel-ai';

import ChatHeader from './ChatHeader';

const API_URL = 'https://therapist-chat.vercel.app/api/chat';

export default function Chat() {
  const {
    messages: chatMsgs,
    setMessages,
    append,
    isLoading,
  } = useChat({
    api: API_URL,
    headers: {
      'content-type': 'application/json',
    },
  });

  const onSend = useCallback(
    (msgs: IMessage[] = []) => {
      append(mapIMessageToMessage(msgs[0]));
    },
    [append],
  );

  const handleQuickReply = replies => {
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

  // TODO: fix quick replies in SlackMessage
  // const renderMessage = props => {
  //   return <SlackMessage {...props} messageTextStyle={{}} />;
  // };

  return (
    <View className="w-full h-full">
      <ChatHeader
        title="מיכאל"
        avatarUri="https://rega.co.il/images/michael.png"
        onNew={() => {
          if (chatMsgs.length) {
            setMessages([]);
          }
        }}
      />

      <GiftedChat
        messagesContainerStyle={{
          backgroundColor: '#FFF8EE',
          // direction: 'ltr',
          paddingVertical: 0,
        }}
        scrollToBottom
        inverted={false}
        isTyping={isLoading}
        messages={
          chatMsgs.length ? chatMsgs.map(mapMessageToIMessage) : FIRST_MESSAGES
        }
        onQuickReply={handleQuickReply}
        onSend={messages => onSend(messages)}
        placeholder="הכנס הודעה..."
        user={{
          _id: 'USER',
        }}
        quickReplyStyle={{
          backgroundColor: '#007AFF',
          borderRadius: 4,
          width: 200,
          margin: 4,
        }}
        quickReplyTextStyle={{
          color: 'white',
          textAlign: 'center',
          direction: 'rtl',
        }}
        alwaysShowSend
        renderSend={props => (
          <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <View className="rotate-[228deg] mr-4">
              <Icon name="send" color="#007AFF" size={24} />
            </View>
          </Send>
        )}
        // TODO: fix quick replies in SlackMessage
        // renderMessage={renderMessage}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              justifyContent: 'flex-end',
              paddingBottom: 0,
            }}
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
                  backgroundColor: '#007AFF',
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
