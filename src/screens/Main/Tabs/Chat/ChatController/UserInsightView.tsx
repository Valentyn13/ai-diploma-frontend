import QuestionnaireScreen from '@common/components/QuestionnaireScreen/QuestionnaireScreen';
import StarterChat from '@common/components/StarterChat';
import { useStarterChatStore } from '@store/useStarterChatStore';

const UserInsightView = () => {
  const { currentStarterChatStep, setStarterChatStep } = useStarterChatStore(
    state => ({
      currentStarterChatStep: state.currentStarterChatStep,
      setStarterChatStep: state.setStarterChatStep,
    }),
  );

  if (currentStarterChatStep === 'agreement') {
    return <QuestionnaireScreen setStep={setStarterChatStep} />;
  }

  return <StarterChat setStep={setStarterChatStep} />;
};

export default UserInsightView;
