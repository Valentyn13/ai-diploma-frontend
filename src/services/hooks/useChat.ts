import { createSseChat, streamAiResponse } from '@services/api/chat';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { mapMessageToIMessage } from '@utils/chat';
import createIMessage from '@utils/createIMessage';
import { generateUUID } from '@utils/generateUUID';
import { useCallback, useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { Message, Session } from 'types/Chat';

import { useRequestWithReauth } from './useAxios/reauthWrapper';

type Props = {
  userId: string;
  chatId: string | null;
};

export const useChat = ({ userId, chatId }: Props) => {
  const { executeApiRequest } = useRequestWithReauth();
  const { setCurrentChatId, addChat } = useChatsStore(state => ({
    setCurrentChatId: state.setCurrentChatId,
    addChat: state.addChat,
  }));

  const { selectedCategory, setLatestActiveSessionId } =
    useCategorizedChatFlowStore(state => ({
      selectedCategory: state.selectedCategory,
      setLatestActiveSessionId: state.setLatestActiveSessionId,
    }));

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [disableUserInput, setDisableUserInput] = useState(false);
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
        setDisableUserInput(true);
        const newChat = (await executeApiRequest(
          createSseChat,
          userId,
          msg,
          selectedCategory,
        )) as Session | null;

        if (!newChat) {
          throw new Error('Failed to create chat');
        }

        await streamAiResponse(
          newChat._id,
          msg,
          selectedCategory,
          setAccumulatedText,
          setDisableUserInput,
        );

        addChat({
          chatId: newChat._id,
          category: newChat.category,
          firstMessageContent: newChat.messages[0].content,
          firstMessageTimestamp: newChat.messages[0].timestamp,
          sessionStartedAfterCreation: true,
        });
        setLatestActiveSessionId(newChat._id);
        const lastMessage = newChat.messages[newChat.messages.length - 1];
        lastMessage.id = lastMessage._id || generateUUID();

        setCurrentChatId(newChat._id);

        setMessages(prevItems => [
          ...prevItems,
          mapMessageToIMessage(lastMessage),
        ]);
      } catch (error) {
        const errorMessage = createIMessage(
          'Помилка при створення чату, спробуйте пізніше.',
          'assistant',
        );
        setMessages(prevItems => [...prevItems, errorMessage]);
        setDisableUserInput(false);
        setIsMessageLoading(false);
      }

      return;
    }

    try {
      setIsMessageLoading(true);
      setDisableUserInput(true);
      streamAiResponse(
        chatId,
        msg,
        selectedCategory,
        setAccumulatedText,
        setDisableUserInput,
      );
    } catch (error) {
      const errorMessage = createIMessage(
        'Помилка при обробці повідомлення, спробуйте створити новий чат',
        'assistant',
      );
      setMessages(prevItems => [...prevItems, errorMessage]);
      setDisableUserInput(false);
      setIsMessageLoading(false);
    }
  };

  return {
    messages,
    isMessageLoading,
    disableUserInput,
    updateMessages,
    addMessage,
  };
};
