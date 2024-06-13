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
    try {
      setLoading(true);
      const data = await fetchChats(user.id);
      setChats(data);
      setLoading(false);
    } catch (err) {
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
