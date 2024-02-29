import { allMeditations } from '@store/selectors';
import { isRecent } from '@utils/session';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EnrichedSession, Meditation } from 'types/Meditation';

const useSessions = () => {
  const allSessions = useSelector(allMeditations) as Meditation[];

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
