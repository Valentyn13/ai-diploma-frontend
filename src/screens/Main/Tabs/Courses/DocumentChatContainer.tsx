import Chat from '@common/components/Chat';
import theme from '@common/theme';
import { useDocumentChatSession } from '@services/hooks/useDocumentChatSession';
import useLoadDocumentChat from '@services/hooks/useLoadDocumentChats';
import { useUser } from '@services/hooks/useUser';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import { mapIMessageToMessage, mapMessageToIMessage } from '@utils/chat';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { IMessage } from 'react-native-gifted-chat';

type DocumentChatContainerProps = {
  documentResponse: DocumentPickerResponse[] | null;
};

const DocumentChatContainer = ({
  documentResponse,
}: DocumentChatContainerProps) => {
  const {
    user: { id: userId },
  } = useUser();

  const { currentChatId } = useDocumentChatStore(state => ({
    currentChatId: state.currentChatId,
  }));

  const { chat, loading, error } = useLoadDocumentChat(currentChatId);

  const {
    messages,
    isMessageLoading,
    disableUserInput,
    addMessage,
    updateMessages,
  } = useDocumentChatSession({
    userId,
    chatId: currentChatId,
  });

  const uploadSelectedDocument = async (msgs: IMessage[] = []) => {
    if (!currentChatId && !documentResponse) {
      console.log('No document selected, cannot create a chat');
      return;
    }
    const msg = mapIMessageToMessage(msgs[0]);
    try {
      if (!currentChatId) {
        if (!documentResponse) {
          console.warn('No document selected');
          return;
        }

        const file = documentResponse[0];
        const formData = new FormData();

        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });

        formData.append('chatName', file.name || 'document.pdf');
        formData.append('cachedPath', file.uri);

        addMessage({
          msg,
          data: formData,
        });
      } else {
        addMessage({
          msg,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const iMessagesFromIncomingChatMessages =
      chat.messages.map(mapMessageToIMessage);
    updateMessages(iMessagesFromIncomingChatMessages);
  }, [chat, updateMessages]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF7EA] w-full h-full">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF7EA] w-full h-full">
        <Text>אירעה שגיאה</Text>
      </View>
    );
  }

  return (
    <Chat
      disableUserInput={disableUserInput}
      messages={messages}
      onSend={uploadSelectedDocument}
      isLoading={isMessageLoading}
    />
  );
};

export default DocumentChatContainer;
