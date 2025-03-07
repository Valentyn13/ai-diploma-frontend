import image from '@common/assets/images';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  DocumentChat as DocumentChatType,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';

import DocumentChatContainer from './DocumentChatContainer';

type DocumentChatProps = {
  selectedChat: DocumentChatType | null | undefined;
};

const DocumentChatPage = ({ selectedChat }: DocumentChatProps) => {
  const [documentResponse, setDocumentResponse] = useState<
    DocumentPickerResponse[] | null
  >(null);

  const { setCurrentStep } = useDocumentChatStore(state => ({
    setCurrentStep: state.setCurrentStep,
  }));

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

  const viewDocument = async () => {
    console.log('view document');
  };

  const onGoBack = () => {
    setCurrentStep('list');
  };

  return (
    <View className="flex-1">
      <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={onGoBack}
        size={35}
        icon="chevron-left"
      />

      <View className="p-4">
        {!selectedChat && (
          <TouchableOpacity onPress={selectDocument}>
            <View>
              <View className="flex-row relative items-center p-2 border rounded-[20px] border-teal-600">
                <FastImage
                  className="w-[90px] h-[90px]"
                  resizeMode="cover"
                  source={image('pdf_find')}
                />
                <Text className="text-[16px] text-gray-600">
                  {documentResponse
                    ? documentResponse[0].name
                    : 'Select document'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {selectedChat && (
          <TouchableOpacity onPress={viewDocument}>
            <View>
              <View className="flex-row relative items-center p-2 border rounded-[20px] border-teal-600">
                {/* <Gradient seed={'pseudo'} angle={45} /> */}
                {/* <Gradient colors={GRADIENTS['minutes']} angle={45} /> */}
                <FastImage
                  className="w-[90px] h-[90px]"
                  resizeMode="cover"
                  source={image('pdf1')}
                />
                <View>
                  <Text>Preview document</Text>
                  <Text className="text-[16px] text-gray-600">
                    {selectedChat.chatName}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <DocumentChatContainer documentResponse={documentResponse} />
    </View>
  );
};

export default DocumentChatPage;
