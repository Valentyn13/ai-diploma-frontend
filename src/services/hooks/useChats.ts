import { fetchChats } from '@services/api/chat';
import { useChatsStore } from '@store/useChatsStore';
import { useCallback, useEffect, useState } from 'react';

import { useUser } from './useUser';

const useChats = () => {
  const { user } = useUser();
  const { chats, setChats } = useChatsStore(state => ({ ...state }));
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
      const withNeedStreaming = data.map(chat => ({
        ...chat,
        needStreaming: false,
      }));
      setChats(withNeedStreaming);
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
