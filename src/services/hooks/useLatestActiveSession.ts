import { getLatestSessionId } from '@services/api/latestActiveSession';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useEffect } from 'react';

import { useUser } from './useUser';

const useLatestActiveSession = () => {
  const { user } = useUser();
  const { setLatestActiveSessionId } = useCategorizedChatFlowStore(state => ({
    setLatestActiveSessionId: state.setLatestActiveSessionId,
  }));

  // TODO: add error handling
  useEffect(() => {
    if (!user.id) {
      return;
    }

    getLatestSessionId(user.id).then(sessionId =>
      setLatestActiveSessionId(sessionId),
    );
  }, [setLatestActiveSessionId, user.id]);
};

export default useLatestActiveSession;
