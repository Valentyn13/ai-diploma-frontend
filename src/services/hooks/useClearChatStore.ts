import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { useCallback } from 'react';

export const useClearChatStore = () => {
  const { reset: chatsReset } = useChatsStore(state => ({
    reset: state.reset,
  }));
  const { reset: categoriesReset } = useCategorizedChatFlowStore(state => ({
    reset: state.reset,
  }));

  const clearChatStore = useCallback(() => {
    categoriesReset();
    chatsReset();
  }, []);

  return {
    clearChatStore,
  };
};
