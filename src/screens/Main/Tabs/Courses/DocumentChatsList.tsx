import Gradient from '@common/components/Gradient';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  DOCUMENT_CHAT_CATEGORY_IMAGES,
  DOCUMENT_CHAT_CATEGORY_TITLES,
} from '@common/constants';
import {
  DocumentChat,
  DocumentChatCategories,
  DocumentChatSteps,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const numColumns = 2;

type GridItemPros = {
  item: DocumentChat;
  setCurrentChatId: (chatId: string | null) => void;
  setCurrentStep: (step: DocumentChatSteps) => void;
};

const GridItem = ({ item, setCurrentChatId, setCurrentStep }: GridItemPros) => {
  const lastElement = item._id === 'new';

  const { currentCategory } = useDocumentChatStore(state => ({
    currentCategory: state.currentCategory,
  }));

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
          'flex-1 m-1 bg-[#E8E6F3] items-center justify-center rounded-xl'
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
        'flex-1 m-1 relative overflow-hidden rounded-xl items-center justify-center'
      }>
      <ImageBackground
        className="absolute w-full h-full opacity-40 "
        resizeMode="cover"
        source={{
          uri: DOCUMENT_CHAT_CATEGORY_IMAGES[
            currentCategory as NonNullable<DocumentChatCategories>
          ],
        }}
      />
      <View className="p-4">
        <Text className={'text-lg font-bold text-black'}>{item.chatName}</Text>
      </View>
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
      {
        _id: 'new',
        chatName: 'New Chat',
        messages: [],
        userId: '1',
        cachedFilePath: '',
        document: '',
        category: 'engineering',
      } as DocumentChat,
    ];
  }, [documentChats, currentCategory]);

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-8">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={onGoBack}
          size={40}
          icon="chevron-left"
        />
        <Text className="font-bold text-2xl text-black">
          {DOCUMENT_CHAT_CATEGORY_TITLES[currentCategory || 'default']}
        </Text>
      </View>

      <GridScreen
        setCurrentChatId={setCurrentChatId}
        data={normalizedDataToRenderWithNewLastElement}
        setCurrentStep={setCurrentStep}
      />
    </View>
  );
};

export default DocumentChatsList;
