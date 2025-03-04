import {
  DocumentChat,
  DocumentChatSteps,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const numColumns = 3;

type GridItemPros = {
  item: DocumentChat;
  setCurrentStep: (step: DocumentChatSteps) => void;
};

const GridItem = ({ item, setCurrentStep }: GridItemPros) => {
  const onElementPress = () => {
    setCurrentStep('chat');
  };

  if (item._id === 'new') {
    return (
      <TouchableOpacity
        onPress={onElementPress}
        style={{
          height: Dimensions.get('window').width / numColumns - 10,
        }}
        className={
          'flex-1 m-1 bg-blue-200 items-center justify-center rounded-xl'
        }>
        <Text className={'text-lg font-bold text-black text-[30px]'}>+</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onElementPress}
      style={{
        height: Dimensions.get('window').width / numColumns - 10,
      }}
      className={
        'flex-1 m-1 bg-blue-200 items-center justify-center rounded-xl'
      }>
      <Text className={'text-lg font-bold'}>{item.chatName}</Text>
    </TouchableOpacity>
  );
};

type GridScreenProps = {
  data: DocumentChat[];
  setCurrentStep: (step: DocumentChatSteps) => void;
};

const GridScreen = ({ data, setCurrentStep }: GridScreenProps) => {
  const renderItem = ({ item }: { item: DocumentChat }) => (
    <GridItem item={item} setCurrentStep={setCurrentStep} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 10,
      }}
    />
  );
};

const DocumentChatsList = () => {
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

  const normalizedDataToRenderWithNewLastElement = useMemo(() => {
    return [
      ...documentChats,
      { _id: 'new', chatName: 'New Chat', messages: [], userId: '1' },
    ];
  }, [documentChats]);
  return (
    <View>
      <Text className="font-bold text-2xl text-black mb-[30px]">
        Document Chats
      </Text>
      <GridScreen
        data={normalizedDataToRenderWithNewLastElement}
        setCurrentStep={setCurrentStep}
      />
    </View>
  );
};

export default DocumentChatsList;
