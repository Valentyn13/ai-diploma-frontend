import { fetchChat } from '@services/api/chat';
import { useEffect, useState } from 'react';
import { Session } from 'types/Chat';

const useChatSession = (chatId: string | null) => {
  const [chat, setChat] = useState<Session>({
    _id: '',
    userId: '',
    messages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId) {
      return;
    }
    setLoading(true);
    fetchChat(chatId)
      .then(chatData => {
        setChat(chatData);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [chatId]);

  return { chat, loading, error };
};

export default useChatSession;
