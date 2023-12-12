/* eslint-disable import/prefer-default-export */

import {init, track, setUserId, Revenue, revenue, flush} from '@amplitude/analytics-react-native';

export const useAmplitude = () => {
  init('427fe3c12d3885dc7345d6a53e3877c8');

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
