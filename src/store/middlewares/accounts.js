import actionTypes from '../../constants/actions';
import { storeFollowedAccount, storeUnFollowedAccount } from '../../utilities/storage';

const peersMiddleware = store => next => (action) => {
  next(action);
  const { accounts } = store.getState();

  switch (action.type) {
    case actionTypes.accountFollowed:
      storeFollowedAccount(action.data, accounts.followed);
      break;
    case actionTypes.accountUnFollowed:
      storeUnFollowedAccount(action.data, accounts.followed);
      break;
    default: break;
  }
};

export default peersMiddleware;
