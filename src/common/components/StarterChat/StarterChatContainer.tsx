import { AMPLITUDE_EVENTS } from '@common/constants';
import theme from '@common/theme';
import { sendStarterChatData } from '@services/api/userInsight';
import { useUser } from '@services/hooks/useUser';
import { setUserStarterChatPassed } from '@store/actions';
import {
  InsightSteps,
  PollResult,
  useStarterChatStore,
} from '@store/useStarterChatStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import createIMessage from '@utils/createIMessage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';

import StarterChat from './StarterChat';

type Props = {
  isPollEnded: boolean;
  setIsPollEnded: (isEnded: boolean) => void;
  setStep: (step: InsightSteps) => void;
};

const WELCOME_MESSAGE =
  'היי, כיף שהגעת. אני הולך לשאול כמה שאלות שיעזרו לי להכיר אותך יותר טוב ולהתאים לך את התהליך הכי מדויק עבורך. אפשר לשתף רק מה שנוח – כל דבר קטן יכול לעזור. שנתחיל?';

const ENDING_MESSAGE =
  'תודה על השיתוף! מעתה אוכל לעזור לך ובצורה מותאמת יותר. ';

const StarterChatContainer = ({
  isPollEnded,
  setIsPollEnded,
  setStep,
}: Props) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const { user } = useUser();

  const {
    starterChatQuestions,
    loading,
    currentQuestionIndex,
    setIsStarterChatActivated,
    // resetStarterChat,
    addUserAnswer,
    setQuestionIndex,
  } = useStarterChatStore(state => ({
    loading: state.loading,
    starterChatQuestions: state.starterChatQuestions,
    currentQuestionIndex: state.currentQuestionIndex,
    // resetStarterChat: state.resetStarterChat,
    addUserAnswer: state.addUserAnswer,
    setIsStarterChatActivated: state.setIsStarterChatActivated,
    setQuestionIndex: state.setQuestionIndex,
  }));

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [isEndingMessageShown, setIsEndingMessageShown] =
    useState<boolean>(false);
  const lastMessageId = messages[messages.length - 1]?._id;

  const handleOnSend = (msgs: IMessage[] = []) => {
    logAmplitudeEvent(
      AMPLITUDE_EVENTS.STARTER_CHAT.ANSWERED_STARTER_CHAT_QUESTION,
    );

    setMessages(prev => [...prev, msgs[0]]);
    setQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex <= starterChatQuestions.length - 1) {
      addUserAnswer(
        starterChatQuestions[currentQuestionIndex]._id,
        msgs[0].text,
      );
    }
  };

  const handleSendPollResult = (result: PollResult) => {
    logAmplitudeEvent(
      AMPLITUDE_EVENTS.STARTER_CHAT.SUBMIT_STARTER_CHAT_ANSWERS,
    );
    const hasResults = !!result && !!Object.values(result).length;

    if (hasResults) {
      setIsStarterChatActivated(false);

      dispatch(
        setUserStarterChatPassed({
          accepted: true,
        }),
      );

      sendStarterChatData(result, user.id);
    }
  };

  // useOverrideBackGesture({
  //   onBack: () => {
  //     setStep('agreement');
  //     resetStarterChat({ disableTabbar: true });
  //     navigation.goBack();
  //   },
  // });

  useEffect(() => {
    if (
      starterChatQuestions[currentQuestionIndex] &&
      currentQuestionIndex === 0
    ) {
      const welComeMessage = createIMessage(WELCOME_MESSAGE, 'assistant');
      welComeMessage._id = 'welcome';
      const firstQuestion = createIMessage(
        starterChatQuestions[currentQuestionIndex].question,
        'assistant',
      );

      setMessages([welComeMessage]);
      setTimeout(() => {
        setIsAiTyping(true);
      }, 200);
      setTimeout(() => {
        setMessages(prev => [...prev, firstQuestion]);
        setIsAiTyping(false);
      }, 1600);
    }
  }, [currentQuestionIndex, starterChatQuestions]);

  useEffect(() => {
    if (
      currentQuestionIndex > starterChatQuestions.length - 1 &&
      !isEndingMessageShown
    ) {
      const lastMessage = createIMessage(ENDING_MESSAGE, 'assistant');
      setIsAiTyping(true);
      setIsEndingMessageShown(true);

      setTimeout(() => {
        setMessages(prev => [...prev, lastMessage]);
        setTimeout(() => {
          setIsPollEnded(true);
        }, 400);
        setIsAiTyping(false);
      }, 2000);
    }
  }, [
    currentQuestionIndex,
    setIsPollEnded,
    starterChatQuestions,
    isEndingMessageShown,
  ]);

  useEffect(() => {
    if (
      currentQuestionIndex <= starterChatQuestions.length - 1 &&
      currentQuestionIndex > 0
    ) {
      const aiMessage = createIMessage(
        starterChatQuestions[currentQuestionIndex].question,
        'assistant',
      );
      setIsAiTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsAiTyping(false);
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF7EA] w-full h-full">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <StarterChat
      isPollEnded={isPollEnded}
      messages={messages}
      isLoading={isAiTyping}
      disableUserInput={
        isAiTyping || currentQuestionIndex > starterChatQuestions.length - 1
      }
      lastMessageId={lastMessageId}
      onSend={handleOnSend}
      handleSendPollResult={handleSendPollResult}
    />
  );
};

export default StarterChatContainer;
