import { setAppData } from '@store/actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useUserData from '../hooks/useUserData';
import useChats from './useChats';
import useGetStarterChatQuestions from './useGetStarterChatQuestions';
import useLatestActiveSession from './useLatestActiveSession';

export default () => {
  const dispatch = useDispatch();
  const { fetchData: fetchChats } = useChats();
  const { fetchPollData } = useGetStarterChatQuestions();
  const { fetchLatestActiveSession } = useLatestActiveSession();
  const { getUserData } = useUserData();
  const [loadSuccess, setLoadSuccess] = useState(false);

  const getAppData = useCallback(() => {
    console.log('===========FETCHING APP DATA========');
    Promise.all([
      fetchPollData(),
      fetchLatestActiveSession(),
      getUserData(),
      fetchChats(),
    ])
      .then(data => {
        console.log(data);
        setLoadSuccess(true);
      })
      .catch(err => console.error(err));
  }, [fetchChats, fetchLatestActiveSession, fetchPollData, getUserData]);

  useEffect(() => {
    if (loadSuccess) {
      dispatch(setAppData({}));
    }
  }, [dispatch, loadSuccess]);

  return {
    getAppData,
  };
};
