import { setAppData } from '@store/actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useUserData from '../hooks/useUserData';
import useChats from './useChats';
import useDocumentChats from './useDocumentChats';
import useGetStarterChatQuestions from './useGetStarterChatQuestions';
import useLatestActiveSession from './useLatestActiveSession';

export default () => {
  const dispatch = useDispatch();
  const { fetchData: fetchChats } = useChats();
  const { fetchData: fetchDocumentChats } = useDocumentChats();
  const { fetchPollData } = useGetStarterChatQuestions();
  const { fetchLatestActiveSession } = useLatestActiveSession();
  const { getUserData } = useUserData();
  const [loadSuccess, setLoadSuccess] = useState(false);

  const getAppData = useCallback(() => {
    Promise.all([
      fetchPollData(),
      fetchLatestActiveSession(),
      getUserData(),
      fetchChats(),
      fetchDocumentChats(),
    ])
      .then(data => {
        console.log(data);
        setLoadSuccess(true);
      })
      .catch(err => console.error(err));
  }, [
    fetchChats,
    fetchLatestActiveSession,
    fetchDocumentChats,
    fetchPollData,
    getUserData,
  ]);

  useEffect(() => {
    if (loadSuccess) {
      dispatch(setAppData({}));
    }
  }, [dispatch, loadSuccess]);

  return {
    getAppData,
  };
};
