import BackgroundTimer from 'react-native-background-timer';
import { Buffer } from 'buffer';
const env = require('./env.json');

global.setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer);
global.setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer);
global.clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer);
global.clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer);

if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

for (var p in env) {
  process.env[p] = env[p];
}

process.browser = false;
global.Buffer = Buffer;
global.Buffer.prototype.reverse = function() {
  return require('buffer-reverse')(this, arguments);
};

const isDev = typeof __DEV__ === 'boolean' && __DEV__;
process.env['NODE_ENV'] = isDev ? 'development' : 'production';
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : '';
}

if (global.navigator && global.navigator.product === 'ReactNative') {
  global.navigator.mimeTypes = '';
  try {
    global.navigator.userAgent = 'ReactNative';
  } catch (e) {
    console.log(
      'Tried to fake useragent, but failed. This is normal on some devices, you may ignore this error: ' +
        e.message
    );
  }
}
