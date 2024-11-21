import { fetchChats } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import { useCallback, useState } from 'react';

import { useUser } from './useUser';

const useChats = () => {
  const { user } = useUser();
  const { chats, isChatsLoading, setIsChatsLoading, setChats } = useChatsStore(
    state => ({
      chats: state.chats,
      isChatsLoading: state.isChatsLoading,
      setIsChatsLoading: state.setIsChatsLoading,
      setChats: state.setChats,
    }),
  );
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user.id) {
      setChats([]);
      return;
    }

    try {
      setIsChatsLoading(true);
      const data = await fetchChats(user.id);
      setChats(data);
    } catch (err: any) {
      setChats([]);
      setError(err);
    } finally {
      setIsChatsLoading(false);
    }
  }, [setChats, setIsChatsLoading, user.id]);
  return { chats, loading: isChatsLoading, error, fetchData };
};

export default useChats;
