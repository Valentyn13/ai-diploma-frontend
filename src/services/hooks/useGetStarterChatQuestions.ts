import { getStarterChatQuestions } from '@services/api/userInsight';
import { useStarterChatStore } from '@store/useStarterChatStore';
import { useCallback } from 'react';

const useGetStarterChatQuestions = () => {
  const { setStarterChatQuestions, setLoadingState } = useStarterChatStore(
    state => ({
      setStarterChatQuestions: state.setStarterChatQuestions,
      setLoadingState: state.setLoadingState,
    }),
  );

  const fetchPollData = useCallback(async () => {
    try {
      setLoadingState(true);
      const data = await getStarterChatQuestions();
      setStarterChatQuestions(data);
    } catch (error) {
      console.log('Error loading chats: ', error);
    } finally {
      setLoadingState(false);
    }
  }, [setLoadingState, setStarterChatQuestions]);

  return { fetchPollData };
};

export default useGetStarterChatQuestions;
