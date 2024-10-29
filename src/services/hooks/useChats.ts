import { fetchChats } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import { useCallback, useEffect, useState } from 'react';

import { useUser } from './useUser';

const useChats = () => {
  const { user } = useUser();
  const { chats, setChats } = useChatsStore(state => ({
    chats: state.chats,
    setChats: state.setChats,
  }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user.id) {
      setChats([]);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchChats(user.id);
      if (!data) {
        throw new Error('No data');
      }
      setChats(data);
      setLoading(false);
    } catch (err: any) {
      setChats([]);
      setError(err);
      setLoading(false);
    }
  }, [setChats, user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { chats, loading, error, fetchData };
};

export default useChats;
