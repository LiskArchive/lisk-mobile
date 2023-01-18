/* eslint-disable import/no-extraneous-dependencies */
import Config from 'react-native-config';
import { MSWServer } from './MSWServer';

if (Config.MOCK_SERVICE_API_ENABLED) {
  require('react-native-url-polyfill/auto');

  const nativeMsw = require('msw/native');

  const mswDevServer = new MSWServer('dev', nativeMsw.setupServer);

  mswDevServer.init({ onUnhandledRequest: 'bypass' });
}
