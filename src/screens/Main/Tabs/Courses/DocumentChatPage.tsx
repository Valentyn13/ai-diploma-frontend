import ThreeDotsIcon from '@common/assets/icons/ThreeDotsIcon';
import TrashSvgIcon from '@common/assets/icons/TrashSvgIcon';
import image from '@common/assets/images';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity as TouchableOpacityBottomSheet,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { deleteDocumentChat } from '@services/api/documentChats';
import {
  DocumentChat as DocumentChatType,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import Pdf from 'react-native-pdf';

import DocumentChatContainer from './DocumentChatContainer';

type DocumentChatProps = {
  selectedChat: DocumentChatType | null | undefined;
};

const DocumentChatPage = ({ selectedChat }: DocumentChatProps) => {
  const navigation = useNavigation();
  const [documentResponse, setDocumentResponse] = useState<
    DocumentPickerResponse[] | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%', 380], []);
  const { setCurrentStep, deleteChat } = useDocumentChatStore(state => ({
    setCurrentStep: state.setCurrentStep,
    deleteChat: state.deleteChat,
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

  const deleteDocumentChatPress = async () => {
    if (selectedChat?._id) {
      deleteDocumentChat(selectedChat?._id);
      deleteChat(selectedChat?._id);
      setIsOpen(false);
      setCurrentStep('list');
    } else {
      console.log('No chat selected, CANNOT DELETE');
    }
  };

  const viewDocument = async () => {
    console.log(selectedChat?.document)
    if (selectedChat?.document) {
      navigation.navigate('WebView', {
        uri: `https://docs.google.com/gview?embedded=true&url=${selectedChat?.document}`,
      });
    }
    console.log('view document');
  };

  const onGoBack = () => {
    setCurrentStep('list');
  };

  const openSettings = () => {
    setIsOpen(true);
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[
          { backgroundColor: 'rgba(0, 0, 0, 1)' },
          StyleSheet.absoluteFillObject,
        ]}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <View className="flex-1">
      <View className="flex-row p-4 items-center justify-between">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={onGoBack}
          size={35}
          icon="chevron-left"
        />
        <TouchableOpacity className="p-[2px]" onPress={openSettings}>
          <View
            style={{
              transform: [{ rotate: '90deg' }],
            }}>
            <ThreeDotsIcon />
          </View>
        </TouchableOpacity>
      </View>

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
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        handleStyle={{ backgroundColor: '#FFF8EE' }}
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}>
        <BottomSheetView>
          <TouchableOpacityBottomSheet onPress={deleteDocumentChatPress}>
            <View className="flex-row items-center p-2 bg-green-100">
              <TrashSvgIcon />
              <Text>Delete chat</Text>
            </View>
          </TouchableOpacityBottomSheet>
        </BottomSheetView>
      </BottomSheetModal>
      {/* <Modal visible={modalOpen}>
        <Pdf source={{ uri: selectedChat?.document }} />
      </Modal> */}
    </View>
  );
};

export default DocumentChatPage;
