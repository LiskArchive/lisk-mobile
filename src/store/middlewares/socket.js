import BackgroundTimer from 'react-native-background-timer';
import NetInfo from '@react-native-community/netinfo';
import actionTypes from '../../constants/actions';
import { blockUpdated } from '../../actions/accounts';
import { account as accountAPI } from '../../utilities/api';
import DropDownHolder from '../../utilities/alert';
import i18n from '../../../locales';

/** To-Do We have to disable socket connection because of
 * Lisk core problem. we will enable socket connection
 * when Lisk core fix the issue
 */

const closeConnection = () => {
  BackgroundTimer.stopBackgroundTimer();
};

export const checkBalance = (store) => {
  const activeToken = store.getState().settings.token.active;
  const { address, balance } = store.getState().accounts.info[activeToken];
  return accountAPI.getSummary(activeToken, { address }).then((res) => {
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

const handleConnectivityChange = (connectionInfo) => {
  if (connectionInfo.isConnected) {
    DropDownHolder.closeAlert();
  } else if (!connectionInfo.isConnected) {
    DropDownHolder.error(
      i18n.t('No internet connection!'),
      i18n.t('Your connection seems to be down, try again later.'),
    );
  }
};

const socketMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountSignedIn:
      socketSetup(store);
      NetInfo.addEventListener(handleConnectivityChange);
      break;
    case actionTypes.accountSignedOut:
      closeConnection();
      NetInfo.removeEventListener(handleConnectivityChange);
      break;
    default: break;
  }
};

export default socketMiddleware;
