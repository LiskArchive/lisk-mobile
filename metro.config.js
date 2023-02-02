/* eslint-disable import/no-extraneous-dependencies */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;

const env = require('./env.json');

console.log('env.APP_MODE', env.APP_MODE);

module.exports = {
  resolver: {
    sourceExts: env.APP_MODE === 'mocked' ? ['mock.js', ...defaultSourceExts] : defaultSourceExts,
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
