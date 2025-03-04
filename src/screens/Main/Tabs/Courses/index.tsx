import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';

import DocumentChat from './DocumentChat';
import DocumentChatsList from './DocumentChatsList';

interface CoursesProps {
  navigation: any;
}

const Courses: FC<CoursesProps> = () => {
  const { currentStep } = useDocumentChatStore(state => ({
    currentStep: state.currentStep,
  }));

  return (
    <SafeAreaView className="flex-1 bg-primary-bg">
      {currentStep === 'list' && <DocumentChatsList />}
      {currentStep === 'chat' && <DocumentChat />}
    </SafeAreaView>
  );
};

export default Courses;
