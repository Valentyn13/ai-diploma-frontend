import { getCategoryImg } from '@common/assets/images/index';
import React, { FC } from 'react';
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Category } from 'types/Category';

interface Props {
  categories: Category[];
  onPress: (category: Category) => void;
}

const CategoriesSelection: FC<Props> = ({ categories, onPress }) => {
  const renderCategory = ({ item }: { item: Category }) => {
    const splitIndex = item.title.indexOf(' ');
    const emoji = item.title.slice(0, splitIndex);
    const title = item.title.slice(splitIndex + 1);

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        className="h-28 flex-1 items-center justify-center m-1 bg-blue-300 rounded-xl overflow-hidden">
        <ImageBackground
          className="relative flex-1 w-full h-full items-center justify-center"
          source={{ uri: getCategoryImg(item.meditations[0].categoryName, 0) }}>
          <View className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
          <Text className="text-2xl">{emoji}</Text>
          <Text className="text-lg text-white mt-2">{title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        scrollEnabled={false}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default CategoriesSelection;
