import {
  FIRST_MESSAGES,
  mapIMessageToMessage,
  mapMessageToIMessage,
  removeEmojiesFromString,
} from '@utils/chat';
import React, { useCallback } from 'react';
import { Text } from 'react-native';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import { useChat } from 'react-native-vercel-ai';

export default function Example() {
  const {
    messages: chatMsgs,
    append,
    isLoading,
  } = useChat({
    api: 'https://rega.co.il/api/chat',
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

  return (
    <GiftedChat
      messagesContainerStyle={{
        backgroundColor: '#FFF8EE',
        paddingBottom: 16,
      }}
      renderLoading={() => <Text>Loading...</Text>}
      inverted={false}
      isTyping={isLoading}
      scrollToBottom
      messages={
        chatMsgs.length ? chatMsgs.map(mapMessageToIMessage) : FIRST_MESSAGES
      }
      onQuickReply={handleQuickReply}
      onSend={messages => onSend(messages)}
      placeholder="הכנס הודעה..."
      user={{
        _id: 'USER',
      }}
      renderSystemMessage={props => (
        <SystemMessage
          {...props}
          textStyle={{
            marginVertical: 10,
            color: 'black',
            textAlign: 'right',
            direction: 'rtl',
          }}
        />
      )}
      renderSend={props => (
        <Send
          {...props}
          label="שלח"
          containerStyle={{ justifyContent: 'center' }}
        />
      )}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            justifyContent: 'flex-end',
            paddingTop: 8,
          }}
          // @ts-ignore
          textInputStyle={{
            textAlign: 'right',
            direction: 'rtl',
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
                direction: 'rtl',
                textAlign: 'left',
              },
              left: {
                direction: 'rtl',
                textAlign: 'left',
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: '#007AFF',
                marginVertical: 4,
                direction: 'rtl',
              },
              left: {
                backgroundColor: '#FFEFD7',
                marginVertical: 4,
                direction: 'rtl',
              },
            }}
          />
        );
      }}
    />
  );
}
