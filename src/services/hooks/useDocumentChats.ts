import { fetchAllDocumentChats } from '@services/api/documentChats';
import {
  DocumentChat,
  useDocumentChatStore,
} from '@store/useDocumentChatsStore';
import { useCallback, useState } from 'react';

import { useRequestWithReauth } from './useAxios/reauthWrapper';
import { useUser } from './useUser';

const useDocumentChats = () => {
  const { user } = useUser();
  const { executeApiRequest } = useRequestWithReauth();
  const { isAllChatsLoading, documentChats, setChats, setAllChatsLoading } =
    useDocumentChatStore(state => ({
      documentChats: state.documentChats,
      isAllChatsLoading: state.isAllChatsLoading,
      setAllChatsLoading: state.setAllChatsLoading,
      setChats: state.setChats,
    }));
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user.id) {
      setChats([]);
      return;
    }

    try {
      setAllChatsLoading(true);
      const data = (await executeApiRequest(fetchAllDocumentChats, user.id)) as
        | DocumentChat[]
        | null;
      if (!data) {
        throw new Error('Failed to fetch chats');
      }
      setChats(data);
    } catch (err: any) {
      setChats([]);
      setError(err);
    } finally {
      setAllChatsLoading(false);
    }
  }, [executeApiRequest, setChats, setAllChatsLoading, user.id]);
  return { documentChats, loading: isAllChatsLoading, error, fetchData };
};

export default useDocumentChats;
