// https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-2733468
// Replacement for lodash.get. But, supports dot notation only
// get([[[[120]]]], '0.0.0.0', 0)

const get = (value, path, defaultValue) => {
  const resolvedValue = String(path)
    .split('.')
    .reduce((acc, v) => {
      if (acc === defaultValue) return acc;
      try {
        // eslint-disable-next-line
        acc = acc[v];
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, value);

  return resolvedValue || defaultValue;
};

export default get;
