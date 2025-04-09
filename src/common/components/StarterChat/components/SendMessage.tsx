import theme from '@common/theme';
import { View } from 'react-native';
import { IMessage, Send, SendProps } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather';

const SendMessage = ({
  isLoading,
  ...props
}: SendProps<IMessage> & {
  isLoading: boolean;
}) => (
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

export default SendMessage;
