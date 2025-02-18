import { setAppData } from '@store/actions';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useChats from './useChats';
import useGetStarterChatQuestions from './useGetStarterChatQuestions';
import useLatestActiveSession from './useLatestActiveSession';

export default () => {
  const dispatch = useDispatch();
  const { fetchData } = useChats();
  const { fetchPollData } = useGetStarterChatQuestions();
  const { fetchLatestActiveSession } = useLatestActiveSession();

  const getAppData = useCallback(() => {
    // fetchPollData();
    // fetchLatestActiveSession();
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(setAppData({}));
  }, [dispatch]);

  return {
    getAppData,
  };
};
