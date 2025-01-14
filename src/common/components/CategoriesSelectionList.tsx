import { getCategoryImg } from '@common/assets/images';
import { FC } from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Category } from 'types/Category';

interface Props {
  categories: Category[];
  onPress: (category: Category) => void;
}
const CategoriesSelectionList: FC<Props> = ({ categories, onPress }) => {
  const renderCategory = ({ item }: { item: Category }) => {
    const splitIndex = item.title.indexOf(' ');
    const emoji = item.title.slice(0, splitIndex);
    const title = item.title.slice(splitIndex + 1);

    return (
      <View>
        <TouchableOpacity
          onPress={() => onPress(item)}
          className="h-[70px] w-[70px] flex-1 items-center justify-center m-1 bg-[#F3EEED] rounded-xl overflow-hidden">
          <View>
            {/*<View className="absolute top-0 left-0 w-full h-full bg-black/70" />*/}
            <View className="px-1 flex flex-col items-center justify-center">
              <Text className="text-xl">{emoji}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text className="text-[13px] text-[#505050] mt-2 text-center w-full">
          {title}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        contentContainerStyle={{
          paddingTop: 4,
          paddingHorizontal: 15,
          gap: 12,
        }}
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderCategory}
        horizontal
      />
    </View>
  );
};

export default CategoriesSelectionList;
