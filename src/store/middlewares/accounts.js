import actionTypes from 'packages/Accounts/actionTypes';
import { storeFollowedAccount } from 'utilities/storage';

const accountsMiddleware = store => next => action => {
  next(action);
  const { accounts } = store.getState();

  switch (action.type) {
    case actionTypes.accountFollowed:
    case actionTypes.accountEdited:
    case actionTypes.accountUnFollowed:
      storeFollowedAccount(accounts.followed);
      break;
    default:
      break;
  }
};

export default accountsMiddleware;
