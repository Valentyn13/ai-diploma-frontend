import theme from '@common/theme';
import { FC, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import {
  Bubble,
  BubbleProps,
  Day,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

interface ChatComponentProps {
  messages: IMessage[];
  onSend: (messages: IMessage[]) => void;
  isLoading: boolean;
  disableUserInput: boolean;
}

const CustomInputToolbar = (props: InputToolbarProps<IMessage>) => (
  <InputToolbar
    {...props}
    containerStyle={{ paddingBottom: 0 }}
    // @ts-ignore
    textInputStyle={{
      color: 'black',
      lineHeight: 20,
    }}
  />
);

const CustomBubble = (props: BubbleProps<IMessage>) => (
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
);

const CustomSend = ({
  isLoading,
  ...props
}: SendProps<IMessage> & { isLoading: boolean }) => (
  <Send
    {...props}
    containerStyle={{ justifyContent: 'center' }}
    disabled={isLoading || !props.text}>
    <View className="rotate-[45deg] mr-4">
      <Icon
        name="send"
        color={isLoading || !props.text ? '#D0D0D0' : theme.colors.primary}
        size={24}
      />
    </View>
  </Send>
);

const Chat: FC<ChatComponentProps> = ({
  messages,
  onSend,
  isLoading,
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
        renderDay={props => (
          <Day {...props} textStyle={{ fontWeight: '500' }} />
        )}
        messages={messages}
        onSend={onSend}
        placeholder="Write a message..."
        user={{ _id: 'USER' }}
        renderSend={props => (
          <CustomSend {...props} isLoading={disableUserInput} />
        )}
        renderInputToolbar={CustomInputToolbar}
        renderBubble={CustomBubble}
      />
    </View>
  );
};

export default Chat;
