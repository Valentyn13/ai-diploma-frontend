import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import React, { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native';

import DocumentChatCategoriesPage from './DocumentChatCategoriesPage';
import DocumentChatPage from './DocumentChatPage';
import DocumentChatsList from './DocumentChatsList';

interface CoursesProps {
  navigation: any;
}

const Courses: FC<CoursesProps> = () => {
  const { currentStep, documentChats, currentChatId } = useDocumentChatStore(
    state => ({
      currentStep: state.currentStep,
      documentChats: state.documentChats,
      currentChatId: state.currentChatId,
    }),
  );

  const selectedChat = useMemo(() => {
    if (currentChatId === null) {
      return null;
    }

    return documentChats.find(chat => chat._id === currentChatId);
  }, [currentChatId, documentChats]);

  return (
    <SafeAreaView className="flex-1 bg-primary-bg">
      {currentStep === 'categories' && <DocumentChatCategoriesPage />}
      {currentStep === 'list' && <DocumentChatsList />}
      {currentStep === 'chat' && (
        <DocumentChatPage selectedChat={selectedChat} />
      )}
    </SafeAreaView>
  );
};

export default Courses;
