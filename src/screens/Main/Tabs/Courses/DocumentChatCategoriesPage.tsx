import { DOCUMENT_CHAT_CATEGORIES } from '@common/constants';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import { FlatList, View } from 'react-native';

import {
  DocumentChatCategoryWithCount,
  renderDocumentChatCategoryListItem,
} from './DocumentChatCategoryList';

const DocumentChatCategoriesPage = () => {
  const { documentChats } = useDocumentChatStore(state => ({
    documentChats: state.documentChats,
  }));

  const documentChatsCategoriesWithChatCount: DocumentChatCategoryWithCount[] =
    DOCUMENT_CHAT_CATEGORIES.map(category => {
      const chatCount = documentChats.filter(
        chat => chat.category === category.name,
      ).length;

      return {
        ...category,
        chatCount,
      };
    });
  console.log(documentChats);
  return (
    <View className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={documentChatsCategoriesWithChatCount}
        keyExtractor={item => item.name}
        renderItem={renderDocumentChatCategoryListItem}
      />
    </View>
  );
};

export default DocumentChatCategoriesPage;
