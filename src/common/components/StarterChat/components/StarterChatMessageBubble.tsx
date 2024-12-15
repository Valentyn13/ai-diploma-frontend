import theme from '@common/theme';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

const StarterChatMessageBubble = ({
  lastMessageId,
  ...props
}: BubbleProps<IMessage> & {
  lastMessageId: string | number | undefined;
}) => (
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
      left: {
        backgroundColor: '#FFEFD7',
        marginTop: 4,
        marginBottom: lastMessageId === props.currentMessage?._id ? 50 : 4,
      },
    }}
  />
);

export default StarterChatMessageBubble;
