import { fetchChat } from '@services/api/chat';
import { useEffect, useState } from 'react';
import { Session } from 'types/Chat';

import { useRequestWithReauth } from './useAxios/reauthWrapper';

const useChatSession = (chatId: string | null) => {
  const { executeApiRequest } = useRequestWithReauth();
  const [chat, setChat] = useState<Session>({
    _id: '',
    userId: '',
    messages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!chatId) {
        return;
      }

      try {
        setLoading(true);
        const data = (await executeApiRequest(
          fetchChat,
          chatId,
        )) as Session | null;
        if (!data) {
          throw new Error('Failed to fetch chat');
        }
        setChat(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chatId]);

  return { chat, loading, error };
};

export default useChatSession;
