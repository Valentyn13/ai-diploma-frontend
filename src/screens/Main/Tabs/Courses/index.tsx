import { getCategoryImg } from '@common/assets/images';
import { baseURL } from '@common/config';
import { createDocumentChat } from '@services/api/documentChats';
import { useUser } from '@services/hooks/useUser';
import { coursesSelector } from '@store/selectors';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import meditationTime from '@utils/time';
import React, { FC } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const numColumns = 3;
const data = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
}));

interface CoursesProps {
  navigation: any;
}

const GridItem = ({ title }: { title: string }) => (
  <View
    style={{
      height: Dimensions.get('window').width / numColumns - 10,
    }}
    className={'flex-1 m-1 bg-blue-200 items-center justify-center'}>
    <Text className={'text-lg font-bold'}>{title}</Text>
  </View>
);

const GridScreen = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <GridItem title={item.title} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 10,
      }}
    />
  );
};

const Courses: FC<CoursesProps> = ({ navigation }) => {
  const [documentResponse, setDocumentResponse] = React.useState<
    DocumentPickerResponse[] | null
  >(null);

  const {
    user: { id: userId },
  } = useUser();

  const { documentChats, setChats, addChat, deleteChat, reset } =
    useDocumentChatStore(state => ({
      documentChats: state.documentChats,
      setChats: state.setChats,
      addChat: state.addChat,
      deleteChat: state.deleteChat,
      reset: state.reset,
    }));

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

  return (
    <SafeAreaView className="flex-1 bg-primary-bg">
      <Text className="font-bold text-2xl text-black mb-[30px]">
        Document Chats
      </Text>
      <GridScreen />
      {/* <Text className="text-2xl font-semibold text-left p-4 text-black">
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
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Courses;
