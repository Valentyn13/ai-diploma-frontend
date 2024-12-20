import image from '@common/assets/images';
import { AMPLITUDE_EVENTS } from '@common/constants';
import { useLogViewedScreenEvent } from '@services/hooks/amplitude';
import { InsightSteps } from '@store/useStarterChatStore';
import { useState } from 'react';
import { View } from 'react-native';

import StarterChatContainer from './StarterChatContainer';
import StarterChatHeader from './StarterChatHeader';

type Props = {
  setStep: (step: InsightSteps) => void;
};

const UserPoll = ({ setStep }: Props) => {
  const [isPollEnded, setIsPollEnded] = useState<boolean>(false);

  const handlePollState = (isEnded: boolean) => {
    setIsPollEnded(isEnded);
  };

  useLogViewedScreenEvent(
    AMPLITUDE_EVENTS.STARTER_CHAT.VIEWED_STARTER_CHAT_SCREEN,
  );

  return (
    <View className="flex flex-1 relative">
      <StarterChatHeader
        title="מיכאל"
        avatarSrc={image('michael_chat')}
        setIsPollEnded={handlePollState}
      />
      <StarterChatContainer
        isPollEnded={isPollEnded}
        setIsPollEnded={handlePollState}
        setStep={setStep}
      />
    </View>
  );
};

export default UserPoll;
