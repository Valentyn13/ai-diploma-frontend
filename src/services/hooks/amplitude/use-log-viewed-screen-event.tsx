import { useFocusEffect } from '@react-navigation/native';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { useCallback } from 'react';

export const useLogViewedScreenEvent = (log: string) => {
  useFocusEffect(
    useCallback(() => {
      logAmplitudeEvent(log);
      return () => {};
    }, [log]),
  );
};
