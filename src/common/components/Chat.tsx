import theme from '@common/theme';
import React, { useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';
import {
  Bubble,
  BubbleProps,
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
  shouldShowPaywall: boolean;
  navigation: any;
}

const CustomInputToolbar = (props: InputToolbarProps<IMessage>) => (
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
    <View className="rotate-[228deg] mr-4">
      <Icon
        name="send"
        color={isLoading || !props.text ? '#D0D0D0' : theme.colors.primary}
        size={24}
      />
    </View>
  </Send>
);

const Chat: React.FC<ChatComponentProps> = ({
  messages,
  onSend,
  isLoading,
  shouldShowPaywall,
  navigation,
}) => {
  const ref = useRef<FlatList<IMessage>>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (shouldShowPaywall) {
      navigation.navigate('Main', {
        screen: 'Subscribe',
        params: {
          isFromChatScreen: true,
        },
      });
    }
  }, [shouldShowPaywall, navigation]);
  return (
    <View className="w-full h-full bg-[#FFF7EA]">
      <GiftedChat
        renderAvatarOnTop
        messageContainerRef={ref}
        disableComposer={isLoading}
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
        renderSend={props => <CustomSend {...props} isLoading={isLoading} />}
        renderInputToolbar={CustomInputToolbar}
        renderBubble={CustomBubble}
      />
    </View>
  );
};

export default Chat;
