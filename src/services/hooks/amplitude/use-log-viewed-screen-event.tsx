import { useFocusEffect } from '@react-navigation/native';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { useCallback } from 'react';

interface UseLogViewedScreenEventOptions {
  shouldIgnore: boolean;
}

export const useLogViewedScreenEvent = (
  log: string,
  { shouldIgnore }: UseLogViewedScreenEventOptions = { shouldIgnore: false },
) => {
  useFocusEffect(
    useCallback(() => {
      if (shouldIgnore) {
        return;
      }

      logAmplitudeEvent(log);

      return () => {};
    }, [log, shouldIgnore]),
  );
};
