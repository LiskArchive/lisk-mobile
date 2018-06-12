import thunk from 'redux-thunk';
import accountsMiddleware from './accounts';

export default [
  thunk,
  accountsMiddleware,
];
