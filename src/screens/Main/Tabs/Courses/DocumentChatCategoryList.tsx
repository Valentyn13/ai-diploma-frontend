import images from '@common/assets/images';
import {
  DocumentChatCategories,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export type DocumentChatCategory = {
  name: DocumentChatCategories;
  subTitle: string;
  title: string;
  info: string;
  image: string;
};

export type DocumentChatCategoryWithCount = DocumentChatCategory & {
  chatCount: number;
};

const CourseItem = ({
  subTitle,
  title,
  info,
  name,
  image,
  chatCount,
}: DocumentChatCategoryWithCount) => {
  const { setCategory, setCurrentStep } = useDocumentChatStore(state => ({
    setCategory: state.setCategory,
    setCurrentStep: state.setCurrentStep,
  }));

  const handleCategoryPress = () => {
    setCategory(name);
    setCurrentStep('list');
  };
  return (
    <TouchableOpacity
      className="flex-1 bg-f6f6f6 rounded-10 overflow-hidden rounded-xl bg-grey-200 mb-4"
      onPress={handleCategoryPress}>
      <ImageBackground
        resizeMode="cover"
        className="absolute w-full h-full opacity-30"
        source={{ uri: image }}
      />
      <View className="p-5 z-10 flex flex-col justify-between h-full">
        <View>
          <Text className="text-2xl font-semibold text-left text-black tracking-wide">
            {title}
          </Text>
          <Text className="font-medium text-lg text-gray-700 text-left mb-4">
            {subTitle}
          </Text>
          <Text className="text-sm text-gray-900 text-left">{info}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mt-8">
          <View className="bg-black/50 px-2 py-1 rounded-full">
            <Text className="text-sm text-white">Чатів: {chatCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const renderDocumentChatCategoryListItem = ({
  item,
}: {
  item: DocumentChatCategoryWithCount;
  index: number;
}) => (
  <CourseItem
    key={item.name}
    chatCount={item.chatCount}
    subTitle={item.subTitle}
    title={item.title}
    info={item.info}
    name={item.name}
    image={item.image}
  />
);
