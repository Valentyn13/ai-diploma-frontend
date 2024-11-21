import { CHAT_TYPES, ChatTypeData } from '@common/constants';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import React, { useMemo } from 'react';

import ConfirmationModal from '../DeleteConfirmation';
import ChatView from './ChatView';
import ChatsList from './ChatsList';
import Selection from './Selection';

const ChatController = () => {
  const {
    currentStep,
    selectedCategory,
    lastActiveSessionId,
    setLatestActiveSessionId,
  } = useCategorizedChatFlowStore(state => ({
    currentStep: state.currentStep,
    lastActiveSessionId: state.lastActiveSessionId,
    selectedCategory: state.selectedCategory,
    setLatestActiveSessionId: state.setLatestActiveSessionId,
  }));

  const {
    currentChatId,
    isDeleteModalVisible,
    deleteCallback,
    chats,
    setIsDeleteModalVisible,
    setCurrentChatId,
    setDeleteCallback,
    setSessionStarted,
  } = useChatsStore(state => ({
    currentChatId: state.currentChatId,
    chats: state.chats,
    setIsDeleteModalVisible: state.setIsDeleteModalVisible,
    isDeleteModalVisible: state.isDeleteModalVisible,
    deleteCallback: state.deleteCallback,
    setCurrentChatId: state.setCurrentChatId,
    setDeleteCallback: state.setDeleteCallback,
    setSessionStarted: state.setSessionStarted,
  }));

  const latestChat = useMemo(() => {
    return chats.find(chat => chat.chatId === lastActiveSessionId);
  }, [chats, lastActiveSessionId]);

  const lastActiveSessionIndex = useMemo(() => {
    return chats
      .filter(chat => chat.category === latestChat?.category)
      .findIndex(chat => chat.chatId === lastActiveSessionId);
  }, [chats, lastActiveSessionId, latestChat?.category]);

  const categories: ChatTypeData[] = useMemo(() => {
    return CHAT_TYPES.map(chatType => {
      const chatTypeWithSessionCount = chats.filter(chat => {
        if (chatType.type === null && !chat.category) {
          return true;
        }
        return chat.category === chatType.type;
      });
      return {
        ...chatType,
        sessionCount: chatTypeWithSessionCount.length,
      };
    });
  }, [chats]);

  const currentCategory = useMemo(() => {
    const category = categories.find(c => c.type === selectedCategory);
    return {
      title: category?.title,
      sessionCount: category?.sessionCount,
    };
  }, [categories, selectedCategory]);

  const handleDeleteChat = async () => {
    if (deleteCallback) {
      deleteCallback();
      setSessionStarted(false);
      setCurrentChatId(null);
      if (currentChatId === lastActiveSessionId) {
        setLatestActiveSessionId(null);
      }
    }
    setDeleteCallback(null);
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      {currentStep === 'selection' && (
        <Selection
          latestChat={latestChat}
          categories={categories}
          lastActiveSessionIndex={lastActiveSessionIndex}
        />
      )}
      {currentStep === 'list' && (
        <ChatsList
          category={currentCategory}
          chats={chats?.filter(chat => {
            return selectedCategory === null
              ? !chat.category
              : chat.category === selectedCategory;
          })}
        />
      )}
      {currentStep === 'chat' && <ChatView />}
      <ConfirmationModal
        type="delete"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteChat}
      />
    </>
  );
};

export default ChatController;
