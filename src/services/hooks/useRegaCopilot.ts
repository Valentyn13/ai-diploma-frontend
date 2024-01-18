import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useCopilot } from 'react-native-copilot';

import useCache from './useCache';

const useRegaCopilot = (
  screenName: string,
  firstStep: string,
  scrollRef?: ScrollView | null,
) => {
  const [isOnboarded, setIsOnboarded] = useCache(
    `copilot-${screenName}`,
    false,
  );
  const { start, copilotEvents } = useCopilot();

  const [started, setStarted] = useState(false);

  const onStop = useCallback(() => setIsOnboarded(true), [setIsOnboarded]);

  useEffect(() => {
    if (isOnboarded) {
      return;
    }

    const timer = setTimeout(() => {
      if (!started) {
        start(firstStep, scrollRef);
        setStarted(true);
        setIsOnboarded(true);
      }
    }, 1000);

    copilotEvents.on('stop', onStop);

    return () => {
      clearTimeout(timer);
      copilotEvents.off('stop', onStop);
    };
  }, [
    copilotEvents,
    firstStep,
    isOnboarded,
    onStop,
    scrollRef,
    setIsOnboarded,
    start,
    started,
  ]);
};

export default useRegaCopilot;
