import {
  Revenue,
  flush,
  init,
  revenue,
  setUserId,
  track,
} from '@amplitude/analytics-react-native';

const AMPLITUDE_API_KEY = '99c650de6e3028a4c95fab92b1b9ea7d';

init(AMPLITUDE_API_KEY);

export const useAmplitude = () => {
  return {
    logEvent: event => {
      track(event);
    },
    setUserId: userId => {
      setUserId(userId);
    },
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
