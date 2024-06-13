import { useEffect, useState } from 'react';
import { Session } from 'types/Chat';

const CHATS_URL = 'https://rega.co.il/api/chats';

const useChatSession = (chatId: string) => {
  const [chat, setChat] = useState<Session>({
    id: '',
    userId: '',
    messages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${CHATS_URL}/${chatId}`);
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

    if (chatId) {
      fetchChat();
    }
  }, [chatId]);

  return { chat, loading, error };
};

export default useChatSession;
