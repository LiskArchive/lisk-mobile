import BackgroundTimer from 'react-native-background-timer';
import NetInfo from '@react-native-community/netinfo';
import actionTypes from 'modules/Accounts/actionTypes';
import DropDownHolder from 'utilities/alert';
import i18n from '../../../locales';

/** To-Do We have to disable socket connection because of
 * Lisk core problem. we will enable socket connection
 * when Lisk core fix the issue
 */

const closeConnection = () => {
  BackgroundTimer.stopBackgroundTimer();
};

const handleConnectivityChange = (connectionInfo) => {
  if (connectionInfo.isConnected) {
    DropDownHolder.closeAlert();
  } else if (!connectionInfo.isConnected) {
    DropDownHolder.error(
      i18n.t('No internet connection!'),
      i18n.t('Your connection seems to be down, try again later.')
    );
  }
};

let unsubscribe;

const socketMiddleware = () => (next) => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.accountSignedIn:
      unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
      break;
    case actionTypes.accountSignedOut:
      closeConnection();
      if (typeof unsubscribe === 'function') unsubscribe();
      break;
    default:
      break;
  }
};

export default socketMiddleware;
