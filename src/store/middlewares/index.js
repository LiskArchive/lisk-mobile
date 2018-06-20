import thunk from 'redux-thunk';
import accountsMiddleware from './accounts';
import socketMiddleware from './socket';

export default [
  thunk,
  accountsMiddleware,
  socketMiddleware,
];
