import { PollResult, useStarterChatStore } from '@store/useStarterChatStore';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';

const StarterChatInputToolbar = ({
  isPollEnded,
  handleSendPollResult,
  ...props
}: InputToolbarProps<IMessage> & {
  isPollEnded: boolean;
  handleSendPollResult: (result: PollResult) => void;
}) => {
  const { starterChatResults } = useStarterChatStore(state => ({
    starterChatResults: state.starterChatResults,
  }));
  if (isPollEnded) {
    return (
      <View className="h-[44px] px-[20px] items-center relative">
        <TouchableOpacity
          onPress={() => handleSendPollResult(starterChatResults)}
          className="h-[60px] w-full bg-[#283A7E] items-center justify-center rounded-[12px] absolute bottom-[18px]">
          <Text className="text-lg bold text-white">Завершити </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <InputToolbar
      {...props}
      containerStyle={{ justifyContent: 'flex-end', paddingBottom: 0 }}
      // @ts-ignore
      textInputStyle={{
        textAlign: 'left',
        color: 'black',
        lineHeight: 20,
      }}
    />
  );
};

export default StarterChatInputToolbar;
