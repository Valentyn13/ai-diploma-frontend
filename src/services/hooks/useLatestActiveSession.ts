import { getLatestSessionId } from '@services/api/latestActiveSession';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useCallback } from 'react';

import { useUser } from './useUser';

const useLatestActiveSession = () => {
  const { user } = useUser();
  const { setLatestActiveSessionId } = useCategorizedChatFlowStore(state => ({
    setLatestActiveSessionId: state.setLatestActiveSessionId,
  }));

  const fetchLatestActiveSession = useCallback(async () => {
    if (!user.id) {
      return;
    }

    getLatestSessionId(user.id).then(sessionId =>
      setLatestActiveSessionId(sessionId),
    );
  }, [setLatestActiveSessionId, user.id]);

  return { fetchLatestActiveSession };
};

export default useLatestActiveSession;
