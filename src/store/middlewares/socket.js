import BackgroundTimer from 'react-native-background-timer';
import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';
import { getAccount } from '../../utilities/api/account';
import { sendNotifications } from '../../utilities/notifications';
import { fromRawLsk } from '../../utilities/conversions';

/** To-Do We have to disable socket connection because of
 * Lisk core problem. we will enable socket connection
 * when Lisk core fix the issue
 */

const closeConnection = () => {
  BackgroundTimer.stopBackgroundTimer();
};

const createNotification = (changes, balance) => {
  let message;
  if ((changes * 1) > 0) {
    message = `you have received ${fromRawLsk(changes)} LSK. your new balance is ${fromRawLsk(balance)} LSk`;
  } else {
    message = `you have sent ${fromRawLsk(Math.abs(changes))} LSK. your new balance is ${fromRawLsk(balance)} LSk`;
  }
  sendNotifications(message);
};

const checkBalance = (store) => {
  const { activePeer } = store.getState().peers;
  const { address, balance } = store.getState().accounts.active;
  getAccount(activePeer, address).then((res) => {
    if (res.balance !== balance) {
      const changes = res.balance - balance;
      createNotification(changes, res.balance);
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
