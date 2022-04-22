import thunk from 'redux-thunk';
import accountsMiddleware from '../../packages/Accounts/reducer';
import socketMiddleware from './socket';
import settingsMiddleware from './settings';

export default [
  thunk,
  accountsMiddleware,
  socketMiddleware,
  settingsMiddleware,
];
