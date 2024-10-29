import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createSseChat, streamAiResponse } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import { mapMessageToIMessage } from '@utils/chat';
import createIMessage from '@utils/createIMessage';
import { generateUUID } from '@utils/generateUUID';
import { useCallback, useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

type Props = {
  userId: string;
  chatId: string | null;
};

export const useChat = ({ userId, chatId }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { setCurrentChatId, addChat } = useChatsStore(state => ({
    setCurrentChatId: state.setCurrentChatId,
    addChat: state.addChat,
  }));

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [accumulatedText, setAccumulatedText] = useState('');

  const updateMessages = useCallback((msgs: IMessage[]) => {
    setMessages([...msgs]);
  }, []);

  useEffect(() => {
    if (isMessageLoading && accumulatedText) {
      setIsMessageLoading(false);
    }
  }, [accumulatedText, isMessageLoading]);

  useEffect(() => {
    if (messages.length > 0 && accumulatedText && !isMessageLoading) {
      const assistantMessage = createIMessage(accumulatedText, 'assistant');
      if (messages[messages.length - 1].user._id === 'DR_MICHAEL') {
        messages[messages.length - 1].text = assistantMessage.text;
        setMessages([...messages]);
      } else {
        setMessages(prevItems => [...prevItems, assistantMessage]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accumulatedText]);

  const addMessage = async (msg: Message) => {
    const message = mapMessageToIMessage(msg);
    setMessages(prevItems => [...prevItems, message]);
    if (!chatId) {
      try {
        setIsMessageLoading(true);
        const newChat = await createSseChat(userId, msg);
        await streamAiResponse(newChat._id, msg, setAccumulatedText);

        addChat({
          chatId: newChat._id,
          firstMessageContent: newChat.messages[0].content,
          firstMessageTimestamp: newChat.messages[0].timestamp,
          sessionStartedAfterCreation: true,
        });

        const lastMessage = newChat.messages[newChat.messages.length - 1];
        lastMessage.id = lastMessage._id || generateUUID();

        setCurrentChatId(newChat._id);

        setMessages(prevItems => [
          ...prevItems,
          mapMessageToIMessage(lastMessage),
        ]);

        navigation.navigate(newChat._id, {
          id: newChat._id,
          isNew: false,
        });
      } catch (error) {
        setIsMessageLoading(false);
      }

      return;
    }

    try {
      setIsMessageLoading(true);
      streamAiResponse(chatId, msg, setAccumulatedText);
    } catch (error) {
      setIsMessageLoading(false);
    }
  };

  return { messages, isMessageLoading, updateMessages, addMessage };
};
