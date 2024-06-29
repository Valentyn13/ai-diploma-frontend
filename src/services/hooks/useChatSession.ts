import { chatApi } from '@common/config';
import { jwtToken } from '@services/hooks/useAxios/index';
import { useEffect, useState } from 'react';
import { Session } from 'types/Chat';

const useChatSession = (chatId: string, isNew: boolean) => {
  const [chat, setChat] = useState<Session>({
    id: '',
    userId: '',
    messages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${chatApi}/${chatId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'content-type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chat');
        }
        const data = await response.json();
        setChat(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (chatId && !isNew) {
      fetchChat();
    } else {
      setChat({ id: chatId, userId: '', messages: [] });
    }
  }, [chatId, isNew]);

  return { chat, loading, error };
};

export default useChatSession;
