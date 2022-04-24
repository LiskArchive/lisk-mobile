import thunk from 'redux-thunk';
import accountsMiddleware from './accounts';
import socketMiddleware from './socket';
import settingsMiddleware from './settings';

export default [
  thunk,
  accountsMiddleware,
  socketMiddleware,
  settingsMiddleware,
];
