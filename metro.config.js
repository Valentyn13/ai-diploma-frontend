const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const {
  createSentryMetroSerializer
} = require("@sentry/react-native/dist/js/tools/sentryMetroSerializer");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  server: {
    rewriteRequestUrl: url => {
      if (!url.endsWith('.bundle')) {
        return url;
      }
      // https://github.com/facebook/react-native/issues/36794
      // JavaScriptCore strips query strings, so try to re-add them with a best guess.
      return (
        url +
        '?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true'
      );
    },
  },

  serializer: {
    customSerializer: createSentryMetroSerializer()
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);