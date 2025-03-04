import { createDocumentChat } from '@services/api/documentChats';
import { useUser } from '@services/hooks/useUser';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import { useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const DocumentChat = () => {
  const {
    documentChats,
    setChats,
    addChat,
    deleteChat,
    reset,
    setCurrentStep,
  } = useDocumentChatStore(state => ({
    documentChats: state.documentChats,
    setCurrentStep: state.setCurrentStep,
    setChats: state.setChats,
    addChat: state.addChat,
    deleteChat: state.deleteChat,
    reset: state.reset,
  }));

  const [documentResponse, setDocumentResponse] = useState<
    DocumentPickerResponse[] | null
  >(null);

  const {
    user: { id: userId },
  } = useUser();

  const selectDocument = async () => {
    try {
      const document = await DocumentPicker.pick({
        type: [types.allFiles],
        allowMultiSelection: false,
        presentationStyle: 'fullScreen',
      });

      setDocumentResponse(document);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled');
      } else {
        console.log(error);
      }
    }
  };

  const uploadSelectedDocument = async () => {
    try {
      if (!documentResponse) {
        console.warn('No document selected');
        return;
      }
      const file = documentResponse[0];
      // Upload the document to the server
      const pickedDocumentBase64 = await RNFS.readFile(file.uri, 'base64');
      const chat = createDocumentChat({
        userId,
        input: 'Describe what in this document',
        chatName: file.name as string,
        document: pickedDocumentBase64,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function requestStoragePermissions() {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ];

        if (Platform.Version < 33) {
          // For Android 12 and below, request WRITE_EXTERNAL_STORAGE
          permissions.push(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        }

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = Object.values(granted).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (allGranted) {
          console.log('All permissions granted!');
        } else {
          console.log('Some permissions were denied.');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const onGoBack = () => {
    setCurrentStep('list');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onGoBack}
        className="bg-blue-700 p-2 w-[200px]">
        <Text className="text-2xl text-white">Go back</Text>
      </TouchableOpacity>
      <Text>DocumentChat</Text>

      <Text className="text-2xl font-semibold text-left p-4 text-black">
        Select documenet
      </Text>

      <View>
        <Text>
          Selected Document:{' '}
          {documentResponse ? documentResponse[0].name : 'No file'}
        </Text>
      </View>
      <TouchableOpacity
        className="w-[140px] p-[8px] bg-blue-500"
        onPress={selectDocument}>
        <Text>Click to select document</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-[140px] p-[8px] bg-blue-500"
        onPress={uploadSelectedDocument}>
        <Text>Upload SelectedDocument</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentChat;
