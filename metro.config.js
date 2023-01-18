/* eslint-disable import/no-extraneous-dependencies */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;

console.log('process.env', process.env);

module.exports = {
  resolver: {
    sourceExts:
      process.env.NODE_ENV === 'mocked' ? ['mock.js', ...defaultSourceExts] : defaultSourceExts,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
