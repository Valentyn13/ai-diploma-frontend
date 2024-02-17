import {
  FIRST_MESSAGES,
  mapIMessageToMessage,
  mapMessageToIMessage,
  removeEmojiesFromString,
} from '@utils/chat';
import React, { useCallback } from 'react';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { useChat } from 'react-native-vercel-ai';

const API_URL = 'https://rega.co.il/api/chat';

export default function Chat() {
  const {
    messages: chatMsgs,
    append,
    isLoading,
  } = useChat({
    api: API_URL,
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
        paddingVertical: 16,
      }}
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
            color: 'black',
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
