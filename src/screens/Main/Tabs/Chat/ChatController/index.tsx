import { AMPLITUDE_EVENTS, CHAT_TYPES, ChatTypeData } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation } from '@react-navigation/native';
import { useLogViewedScreenEvent } from '@services/hooks/amplitude';
import { useUser } from '@services/hooks/useUser';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import React, { useEffect, useMemo } from 'react';

import ConfirmationModal from '../DeleteConfirmation';
import ChatView from './ChatView';
import ChatsList from './ChatsList';
import Selection from './Selection';
import UserInsightView from './UserInsightView';

const ChatController = () => {
  const navigation = useNavigation<any>();
  const { hasPremium } = usePurchases();
  const {
    user: { hasPassedStarterChat, id: userId },
  } = useUser();

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

  const shouldShowPaywall = useMemo(
    () => !hasPremium && !hasPassedStarterChat && !!userId,
    [hasPremium, hasPassedStarterChat, userId],
  );

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
      categoryValue: selectedCategory,
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

  useEffect(() => {
    if (shouldShowPaywall) {
      navigation.navigate('Main', {
        screen: 'Subscribe',
        params: {
          isFromChatController: true,
        },
      });
    }
  }, [shouldShowPaywall, navigation]);

  useLogViewedScreenEvent(AMPLITUDE_EVENTS.CHATS.VIEWED_SCREEN);

  return (
    <>
      {currentStep === 'selection' ? (
        hasPassedStarterChat ? (
          <Selection
            categories={categories}
            lastActiveSessionIndex={lastActiveSessionIndex}
            latestChat={latestChat}
          />
        ) : (
          <UserInsightView shouldShowPaywall={shouldShowPaywall} />
        )
      ) : null}
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
