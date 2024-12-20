import QuestionnaireScreen from '@common/components/QuestionnaireScreen/QuestionnaireScreen';
import StarterChat from '@common/components/StarterChat';
import { useStarterChatStore } from '@store/useStarterChatStore';

interface UserInsightViewProps {
  shouldShowPaywall: boolean;
}

const UserInsightView = ({ shouldShowPaywall }: UserInsightViewProps) => {
  const { currentStarterChatStep, setStarterChatStep } = useStarterChatStore(
    state => ({
      currentStarterChatStep: state.currentStarterChatStep,
      setStarterChatStep: state.setStarterChatStep,
    }),
  );

  if (currentStarterChatStep === 'agreement') {
    return (
      <QuestionnaireScreen
        shouldShowPaywall={shouldShowPaywall}
        setStep={setStarterChatStep}
      />
    );
  }

  return (
    <StarterChat
      shouldShowPaywall={shouldShowPaywall}
      setStep={setStarterChatStep}
    />
  );
};

export default UserInsightView;
