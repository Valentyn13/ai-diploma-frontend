import { CircleButton } from '@common/components/buttons/CircleButton';
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
  setCurrentChatId: (chatId: string | null) => void;
  setCurrentStep: (step: DocumentChatSteps) => void;
};

const GridItem = ({ item, setCurrentChatId, setCurrentStep }: GridItemPros) => {
  const lastElement = item._id === 'new';

  const onElementPress = () => {
    if (lastElement) {
      setCurrentChatId(null);
    } else {
      setCurrentChatId(item._id);
    }

    setCurrentStep('chat');
  };

  if (lastElement) {
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
  setCurrentChatId: (chatId: string | null) => void;
  setCurrentStep: (step: DocumentChatSteps) => void;
};

const GridScreen = ({
  data,
  setCurrentChatId,
  setCurrentStep,
}: GridScreenProps) => {
  const renderItem = ({ item }: { item: DocumentChat }) => (
    <GridItem
      item={item}
      setCurrentChatId={setCurrentChatId}
      setCurrentStep={setCurrentStep}
    />
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
  const { documentChats, currentCategory, setCurrentChatId, setCurrentStep } =
    useDocumentChatStore(state => ({
      currentCategory: state.currentCategory,
      documentChats: state.documentChats,
      setCurrentStep: state.setCurrentStep,
      setCurrentChatId: state.setCurrentChatId,
    }));

  const onGoBack = () => {
    setCurrentStep('categories');
  };

  const normalizedDataToRenderWithNewLastElement = useMemo(() => {
    const filteredChats = documentChats.filter(
      chat => chat.category === currentCategory,
    );
    return [
      ...filteredChats,
      { _id: 'new', chatName: 'New Chat', messages: [], userId: '1' },
    ];
  }, [documentChats, currentCategory]);

  return (
    <View>
      <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={onGoBack}
        size={40}
        icon="chevron-left"
      />
      <Text className="font-bold text-2xl text-black mb-[30px]">
        Document Chats
      </Text>
      <GridScreen
        setCurrentChatId={setCurrentChatId}
        data={normalizedDataToRenderWithNewLastElement}
        setCurrentStep={setCurrentStep}
      />
    </View>
  );
};

export default DocumentChatsList;
