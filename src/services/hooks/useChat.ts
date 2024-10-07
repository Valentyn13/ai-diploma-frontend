import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addMessageToChat, createChat } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import { mapMessageToIMessage } from '@utils/chat';
import { generateUUID } from '@utils/generateUUID';
import { useCallback, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

type Props = {
  userId: string;
  chatId: string | null;
};

export const useChat = ({ userId, chatId }: Props) => {
  const setCurrentChatId = useChatsStore(state => state.setCurrentChatId);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const addChat = useChatsStore(state => state.addChat);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const updateMessages = useCallback((msgs: IMessage[]) => {
    setMessages([...msgs]);
  }, []);

  const addMessage = useCallback(
    async (msg: Message) => {
      const message = mapMessageToIMessage(msg);
      setMessages(prevItems => [...prevItems, message]);

      setIsMessageLoading(true);
      if (!chatId) {
        const newChat = await createChat(userId, msg);

        addChat({
          chatId: newChat._id,
          firstMessageContent: newChat.messages[0].content,
          firstMessageTimestamp: newChat.messages[0].timestamp,
          needStreaming: true,
        });

        const lastMessage = newChat.messages[newChat.messages.length - 1];
        lastMessage.id = lastMessage._id || generateUUID();

        setCurrentChatId(newChat._id);

        setMessages(prevItems => [
          ...prevItems,
          mapMessageToIMessage(lastMessage),
        ]);

        setIsMessageLoading(false);

        navigation.navigate(newChat._id, {
          id: newChat._id,
          isNew: false,
        });

        return;
      }

      const responseByAI = await addMessageToChat(chatId, msg);
      responseByAI.id = responseByAI._id || generateUUID();

      const iMessage = mapMessageToIMessage(responseByAI);
      setMessages(prevItems => [...prevItems, iMessage]);
      setIsMessageLoading(false);
    },
    [chatId, userId, addChat, navigation, setCurrentChatId],
  );

  return { messages, isMessageLoading, updateMessages, addMessage };
};
