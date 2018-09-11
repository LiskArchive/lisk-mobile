import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';
import { getAccount } from '../../utilities/api/account';

/** To-Do We have to disable socket connection because of
 * Lisk core problem. we will enable socket connection
 * when Lisk core fix the issue
 */
let interval;

const closeConnection = () => {
  clearInterval(interval);
};

const socketSetup = (store) => {
  const { activePeer } = store.getState().peers;
  interval = setInterval(() => {
    const { address, balance } = store.getState().accounts.active;
    getAccount(activePeer, address).then((res) => {
      if (res.balance !== balance) {
        store.dispatch(blockUpdated());
      }
    });
  }, 60000);
};

const socketMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountLoggedIn:
      socketSetup(store);
      break;
    case actionTypes.accountLoggedOut:
      closeConnection();
      break;
    default: break;
  }
};

export default socketMiddleware;
