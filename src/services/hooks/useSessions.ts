import { allMeditations } from '@store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Meditation } from 'types/Meditation';

const useSessions = () => {
  const allSessions = useSelector(allMeditations);
  const [sessions, setSessions] = useState<Meditation[]>(allSessions);

  useEffect(() => {
    setSessions(allSessions);
  }, [allSessions]);

  return { sessions };
};

export default useSessions;
