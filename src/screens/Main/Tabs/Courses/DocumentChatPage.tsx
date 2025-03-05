import Chat from '@common/components/Chat';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useDocumentChatSession } from '@services/hooks/useDocumentChatSession';
import useLoadDocumentChat from '@services/hooks/useLoadDocumentChats';
import { useUser } from '@services/hooks/useUser';
import {
  DocumentChat as DocumentChatType,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { mapIMessageToMessage, mapMessageToIMessage } from '@utils/chat';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { IMessage } from 'react-native-gifted-chat';

type DocumentChatProps = {
  selectedChat: DocumentChatType | null | undefined;
};

const DocumentChatPage = ({ selectedChat }: DocumentChatProps) => {
  const {
    user: { id: userId },
  } = useUser();

  const { currentChatId, deleteChat, setCurrentStep } = useDocumentChatStore(
    state => ({
      currentChatId: state.currentChatId,
      setCurrentStep: state.setCurrentStep,
      deleteChat: state.deleteChat,
    }),
  );

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

  const { chat, loading, error } = useLoadDocumentChat(currentChatId);

  const [documentResponse, setDocumentResponse] = useState<
    DocumentPickerResponse[] | null
  >(null);

  const selectDocument = async () => {
    try {
      const document = await DocumentPicker.pick({
        type: [types.allFiles],
        allowMultiSelection: false,
        presentationStyle: 'fullScreen',
      });

      setDocumentResponse(document);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User cancelled');
      } else {
        console.log(e);
      }
    }
  };

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
        const pickedDocumentBase64 = await RNFS.readFile(file.uri, 'base64');
        addMessage({
          msg,
          chatName: file.name || 'document.pdf',
          document: pickedDocumentBase64,
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

  const onGoBack = () => {
    setCurrentStep('list');
  };

  useEffect(() => {
    const iMessagesFromIncomingChatMessages =
      chat.messages.map(mapMessageToIMessage);
    updateMessages(iMessagesFromIncomingChatMessages);
  }, [chat, updateMessages]);

  return (
    <View className="flex-1">
      <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={onGoBack}
        size={35}
        icon="chevron-left"
      />
      {!selectedChat && (
        <View>
          <Text className="text-2xl font-semibold text-left p-4 text-black">
            Select documenet
          </Text>
          <TouchableOpacity onPress={selectDocument}>
            <View className=" justify-center items-center">
              <View className="p-4 border border-teal-600">
                <Text>
                  {documentResponse
                    ? documentResponse[0].name
                    : 'Select document'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Chat
        disableUserInput={disableUserInput}
        messages={messages}
        onSend={uploadSelectedDocument}
        isLoading={isMessageLoading}
      />
    </View>
  );
};

export default DocumentChatPage;
