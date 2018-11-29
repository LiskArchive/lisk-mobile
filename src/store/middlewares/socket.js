import BackgroundTimer from 'react-native-background-timer';
import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';
import { getAccount } from '../../utilities/api/account';

/** To-Do We have to disable socket connection because of
 * Lisk core problem. we will enable socket connection
 * when Lisk core fix the issue
 */

const closeConnection = () => {
  BackgroundTimer.stopBackgroundTimer();
};

export const checkBalance = (store) => {
  const { activePeer } = store.getState().peers;
  const { address, balance } = store.getState().accounts.active;
  return getAccount(activePeer, address).then((res) => {
    if (res.balance !== balance) {
      store.dispatch(blockUpdated());
    }
  });
};

const socketSetup = (store) => {
  BackgroundTimer.runBackgroundTimer(() => {
    checkBalance(store);
  }, 30000);
};

const socketMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountSignedIn:
      socketSetup(store);
      break;
    case actionTypes.accountSignedOut:
      closeConnection();
      break;
    default: break;
  }
};

export default socketMiddleware;
