import {
  createDocumentChat,
  streamDocumentResponse,
} from '@services/api/documentChats';
import {
  DocumentChat,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { mapMessageToIMessage } from '@utils/chat';
import createIMessage from '@utils/createIMessage';
import { generateUUID } from '@utils/generateUUID';
import { useCallback, useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

import { useRequestWithReauth } from './useAxios/reauthWrapper';

type Props = {
  userId: string;
  chatId: string | null;
};

export const useDocumentChatSession = ({ userId, chatId }: Props) => {
  const { executeApiRequest } = useRequestWithReauth();

  const { currentCategory, addChat, setCurrentChatId } = useDocumentChatStore(
    state => ({
      currentCategory: state.currentCategory,
      addChat: state.addChat,
      setCurrentChatId: state.setCurrentChatId,
    }),
  );

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

  const addMessage = async ({
    msg,
    data,
  }: {
    msg: Message;
    data?: FormData;
  }) => {
    const message = mapMessageToIMessage(msg);
    setMessages(prevItems => [...prevItems, message]);

    if (!chatId) {
      try {
        setIsMessageLoading(true);
        setDisableUserInput(true);

        data?.append('category', currentCategory);
        data?.append('input', msg.content);
        const newChat = (await executeApiRequest(createDocumentChat, {
          userId,
          data: data as FormData,
        })) as DocumentChat | null;

        if (!newChat) {
          throw new Error('Failed to create chat');
        }

        await streamDocumentResponse(
          newChat._id,
          msg,
          setAccumulatedText,
          setDisableUserInput,
        );

        addChat({
          _id: newChat._id,
          messages: newChat.messages,
          chatName: newChat.chatName,
          userId: newChat.userId,
          category: currentCategory,
          cachedFilePath: newChat.cachedFilePath,
        });

        const lastMessage = newChat.messages[newChat.messages.length - 1];
        lastMessage.id = lastMessage._id || generateUUID();

        setCurrentChatId(newChat._id);

        setMessages(prevItems => [
          ...prevItems,
          mapMessageToIMessage(lastMessage),
        ]);
      } catch (error) {
        const errorMessage = createIMessage(
          'משהו השתבש בבקשה נסה שוב',
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
      streamDocumentResponse(
        chatId,
        msg,
        setAccumulatedText,
        setDisableUserInput,
      );
    } catch (error) {
      const errorMessage = createIMessage(
        'משהו השתבש בבקשה נסה שוב',
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
