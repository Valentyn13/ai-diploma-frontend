module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@common': './src/common',
          '@services': './src/services',
          '@utils': './src/utils',
          '@screens': './src/screens',
          store: './src/store',
        },
      },
    ],
  ],
};
