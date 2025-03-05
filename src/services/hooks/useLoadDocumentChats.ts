import { fetchDocumentChat } from '@services/api/documentChats';
import { DocumentChat } from '@store/useDocumentChatsStore';
import { useEffect, useState } from 'react';

import { useRequestWithReauth } from './useAxios/reauthWrapper';

const useLoadDocumentChat = (chatId: string | null) => {
  const { executeApiRequest } = useRequestWithReauth();
  const [chat, setChat] = useState<DocumentChat>({
    _id: '',
    userId: '',
    messages: [],
    chatName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!chatId) {
        console.log('No id to load chat');
        return;
      }

      try {
        setLoading(true);
        const data = (await executeApiRequest(
          fetchDocumentChat,
          chatId,
        )) as DocumentChat | null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return { chat, loading, error };
};

export default useLoadDocumentChat;
