import { FlatList, View } from 'react-native';

import { renderDocumentChatCategoryListItem } from './DocumentChatCategoryList';

const categories = [
  {
    name: 'general',
    subTitle: 'Some subtitle with medicine',
    title: 'General',
    info: 'Some info about medicine, viery interesting and cool',
    image:
      'https://img.freepik.com/free-photo/3d-abstract-wave-pattern-background_53876-104422.jpg',
  },
  {
    name: 'medicine',
    subTitle: 'Some subtitle with math',
    title: 'Medicine',
    info: 'Some info about math, viery interesting and cool',
    image:
      'https://img.freepik.com/free-photo/3d-abstract-wave-pattern-background_53876-104422.jpg',
  },
  {
    name: 'engineering',
    subTitle: 'Some subtitle with math',
    title: 'Engineering',
    info: 'Some info about math, viery interesting and cool',
    image:
      'https://img.freepik.com/free-photo/3d-abstract-wave-pattern-background_53876-104422.jpg',
  },
];

const DocumentChatCategoriesPage = () => {
  return (
    <View className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.name}
        renderItem={renderDocumentChatCategoryListItem}
      />
    </View>
  );
};

export default DocumentChatCategoriesPage;
