import theme from '@common/theme';
import { PollResult } from '@store/useStarterChatStore';
import { FC, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SendMessage from './components/SendMessage';
import StarterChatInputToolbar from './components/StarterChatInputToolbar';
import StarterChatMessageBubble from './components/StarterChatMessageBubble';

interface ChatComponentProps {
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
  handleSendPollResult: (result: PollResult) => void;
  isLoading: boolean;
  isPollEnded: boolean;
  lastMessageId: string | number | undefined;
  disableUserInput: boolean;
}

const StarterChat: FC<ChatComponentProps> = ({
  messages,
  onSend,
  handleSendPollResult,
  isLoading,
  lastMessageId,
  isPollEnded,
  disableUserInput,
}) => {
  const ref = useRef<FlatList<IMessage>>(null);
  const insets = useSafeAreaInsets();

  return (
    <View className="w-full flex-1 bg-[#FFF7EA]">
      <GiftedChat
        renderAvatarOnTop
        messageContainerRef={ref}
        disableComposer={disableUserInput}
        bottomOffset={Platform.OS === 'ios' ? insets.bottom + 64 : 0}
        messagesContainerStyle={{
          backgroundColor: theme.colors.light,
          paddingVertical: 0,
        }}
        scrollToBottom
        alwaysShowSend
        inverted={false}
        isTyping={isLoading}
        messages={messages}
        onSend={onSend}
        placeholder="הכנס הודעה..."
        user={{ _id: 'USER' }}
        renderSend={props => (
          <SendMessage {...props} isLoading={disableUserInput} />
        )}
        renderInputToolbar={props => (
          <StarterChatInputToolbar
            {...props}
            handleSendPollResult={handleSendPollResult}
            isPollEnded={isPollEnded}
          />
        )}
        renderBubble={props => (
          <StarterChatMessageBubble {...props} lastMessageId={lastMessageId} />
        )}
      />
    </View>
  );
};

export default StarterChat;
