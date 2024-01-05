import {
  Revenue,
  flush,
  init,
  revenue,
  setUserId,
  track,
} from '@amplitude/analytics-react-native';
import { useCallback } from 'react';

const AMPLITUDE_API_KEY = '99c650de6e3028a4c95fab92b1b9ea7d';

init(AMPLITUDE_API_KEY);

export const useAmplitude = () => {
  const trackEvent = useCallback(
    (event: string, props?: Record<string, any>) => {
      track(event, props);
    },
    [],
  );

  return {
    logEvent: trackEvent,
    setUserId,
    logRevenue: item => {
      try {
        const event = new Revenue()
          .setProductId(item.productId)
          .setPrice(item.price)
          .setRevenueType(item.revenueType);
        revenue(event);
      } catch (e) {
        console.log(e);
      }
    },
    uploadEvents: () => {
      flush();
    },
  };
};
