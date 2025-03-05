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

  const { addChat, setCurrentChatId } = useDocumentChatStore(state => ({
    addChat: state.addChat,
    setCurrentChatId: state.setCurrentChatId,
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

  const addMessage = async ({
    msg,
    chatName,
    document,
  }: {
    msg: Message;
    chatName?: string;
    document?: string;
  }) => {
    const message = mapMessageToIMessage(msg);
    setMessages(prevItems => [...prevItems, message]);
    console.log('chatId into function', chatId);
    if (!chatId) {
      try {
        setIsMessageLoading(true);
        setDisableUserInput(true);
        const newChat = (await executeApiRequest(createDocumentChat, {
          userId,
          input: msg.content,
          chatName,
          document,
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
