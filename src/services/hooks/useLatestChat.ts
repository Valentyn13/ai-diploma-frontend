import { AMPLITUDE_EVENTS } from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { useCallback, useMemo } from 'react';
import { ChatForDrawer } from 'types/Chat';

import { useUser } from './useUser';

type UseLatestChatProps = {
  withNavigation: boolean;
};

const useLatestChat = ({ withNavigation }: UseLatestChatProps) => {
  const navigation = useNavigation();
  const {
    user: { hasPassedStarterChat },
  } = useUser();
  const { chats, setCurrentChatId } = useChatsStore(state => ({
    chats: state.chats,
    setCurrentChatId: state.setCurrentChatId,
  }));

  const { lastActiveSessionId, setCurrentStep, setSelectedCategory } =
    useCategorizedChatFlowStore(state => ({
      lastActiveSessionId: state.lastActiveSessionId,
      setCurrentStep: state.setCurrentStep,
      setSelectedCategory: state.setSelectedCategory,
    }));

  const latestChat = useMemo(() => {
    return (
      chats.find(chat => chat.chatId === lastActiveSessionId) ||
      chats.reduce((latest, current) => {
        return new Date(current.updatedAt) > new Date(latest.updatedAt)
          ? current
          : latest;
      }, chats[0])
    );
  }, [chats, lastActiveSessionId]);

  const lastActiveSessionIndex = useMemo(() => {
    const categoryFilter = latestChat?.category
      ? (chat: ChatForDrawer) => chat.category === latestChat.category
      : (chat: ChatForDrawer) => !chat.category;

    return (
      chats
        .filter(categoryFilter)
        .findIndex(chat => chat.chatId === latestChat.chatId) + 1
    );
  }, [chats, latestChat]);

  const handleOpenChats = useCallback(() => {
    if (!hasPassedStarterChat) {
      setCurrentStep('selection');
    }
    logAmplitudeEvent(AMPLITUDE_EVENTS.HOME_SCREEN.PRESSED_MICHAEL_CHAT_CTA);

    navigation.navigate('Chat');
  }, [hasPassedStarterChat, navigation, setCurrentStep]);

  const handleOpenRecentChat = useCallback(() => {
    logAmplitudeEvent(
      AMPLITUDE_EVENTS.CHATS.PRESSED_CONTINUE_LAST_CONVERSATION_CTA,
    );

    if (!hasPassedStarterChat) {
      setCurrentStep('selection');
      if (withNavigation) {
        navigation.navigate('Chat');
      }
      return;
    }

    setCurrentStep('chat');
    setSelectedCategory(latestChat?.category || null);
    setCurrentChatId(latestChat.chatId);
    if (withNavigation) {
      navigation.navigate('Chat');
    }
  }, [
    hasPassedStarterChat,
    latestChat?.category,
    latestChat?.chatId,
    navigation,
    setCurrentChatId,
    setCurrentStep,
    setSelectedCategory,
    withNavigation,
  ]);

  return {
    lastActiveSessionIndex,
    latestChat,
    handleOpenRecentChat,
    handleOpenChats,
    chats,
  };
};

export default useLatestChat;
