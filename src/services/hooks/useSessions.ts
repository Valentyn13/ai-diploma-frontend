import { isRecent } from '@utils/session';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EnrichedSession, Session } from 'types/Meditation';

const useSessions = () => {
  const allSessions = useMemo(() => [], []);

  const sessions = useMemo(
    () =>
      allSessions.map(session => ({
        ...session,
        isNew: isRecent(session),
      })) as EnrichedSession[],
    [allSessions],
  );

  return { sessions };
};

export default useSessions;
