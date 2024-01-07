import {
  Revenue,
  flush,
  init,
  revenue,
  setUserId,
  track,
} from '@amplitude/analytics-react-native';
import { useCallback } from 'react';

const AMPLITUDE_API_KEY = '427fe3c12d3885dc7345d6a53e3877c8';

init(AMPLITUDE_API_KEY);

export const AMPLITUDE_EVENTS = {
  // Onboarding
  ONBOARDING_START: 'onboarding_start',
  ONBOARDING_SCREEN_VIEW: 'onboarding_screen_view',
  ONBOARDING_FINISH: 'onboarding_finish',
};

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
