
/* eslint-disable no-console */
export default {
  log: (message, ...params) => {
    console.log(`Rega - ${message}`, ...params);
  },
  error: (message, ...params) => {
    console.log(`Rega - *** ERROR *** ${message}`, ...params);
  },
};
