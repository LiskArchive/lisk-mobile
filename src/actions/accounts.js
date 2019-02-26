import actionTypes from '../constants/actions';
import { retrieveAccounts, storeAccounts } from '../utilities/storage';
import { account as accountAPI, transactions as transactionsAPI } from '../utilities/api';
import { loadingStarted, loadingFinished } from './loading';

/**
 * Stores the given accounts data in AsyncStorage
 * No normalization or validation here.
 * Vividly, this action is not handled in Redux Reducers
 *
 * @todo Rejection must is not handled
 *
 * @param {Object} data - The accounts data to get stored in asyncStorage
 * @returns {Function} Thunk action function
 */
export const accountsStored = data =>
  (dispatch) => {
    storeAccounts(data)
      .then(() => {
        dispatch({
          type: actionTypes.accountsStored,
        });
      });
  };

/**
 * Retrieves the stored accounts and then
 * dispatches an action to store the accounts
 * in Redux store
 *
 * The retrieved data has been normalized and validated
 * in Storage utility, thus no need for such logics here.
 *
 * Rejection must is handled in Storage utility and returns Raw account interface
 *
 * @returns {Function} Thunk action function
 */
export const accountsRetrieved = () =>
  (dispatch) => {
    retrieveAccounts()
      .then((accounts) => {
        dispatch({
          type: actionTypes.accountsRetrieved,
          data: accounts,
        });
      });
  };

/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @param {String} address - Valid Lisk ID
 * @param {String} label - A custom string of length 3-16
 *
 * @returns {Object} - Pure action function
 */
export const accountFollowed = (address, label) => ({
  type: actionTypes.accountFollowed,
  data: {
    address,
    label,
  },
});

/**
 * Returns a pure action object to remove the given account
 * from the list of followed accounts
 *
 * @param {String} account.address - Valid Lisk ID
 *
 * @returns {Object} - Pure action function
 */
export const accountUnFollowed = address => ({
  type: actionTypes.accountUnFollowed,
  data: address,
});

/**
 * Returns a pure action object to edit/update the values of
 * a followed account
 *
 * @param {String} address - Valid Lisk ID
 * @param {Object} updatedData
 * @param {String} updatedData.address - Valid Lisk ID
 * @param {String} updatedData.label - A string title/label of length 3-18 chars
 *
 * @returns {Object} - Pure action function
 */
export const accountEdited = (address, label) => ({
  type: actionTypes.accountEdited,
  data: { address, label },
});

/**
 * Uses Http call to fetch Account and delegate info of a given
 * passphrase and dispatches accountSignedIn action
 *
 * @todo Implement delegate Api call
 *
 * @param {Object} data
 * @param {String} data.passphrase - The valid passphrase to sign in using
 * @returns {Function} Thunk function
 */
export const accountSignedIn = ({ passphrase }, cb) => (dispatch, getState) => {
  dispatch(loadingStarted(actionTypes.accountSignedIn));
  const activeToken = getState().settings.token.active;
  const address = accountAPI.extractAddress(activeToken, passphrase);
  return accountAPI.getSummary(activeToken, address)
    .then((account) => {
      dispatch({
        type: actionTypes.accountSignedIn,
        data: { account, passphrase, activeToken },
      });
      dispatch(accountsRetrieved());
      dispatch(loadingFinished(actionTypes.accountSignedIn));
    }).catch((err) => {
      dispatch(loadingFinished(actionTypes.accountSignedIn));
      cb(err);
    });
};

export const accountSignedOut = () => ({
  type: actionTypes.accountSignedOut,
});

export const blockUpdated = () => async (dispatch, getState) => {
  const activeToken = getState().settings.token.active;
  const { address } = getState().accounts.info[activeToken];
  const { confirmed } = getState().transactions;
  const lastTx = confirmed.length > 0 ? confirmed[0] : { timestamp: 0 };

  try {
    const response = await transactionsAPI.get(activeToken, {
      address,
      offset: 0,
    });

    const newTransactions = response.data.filter(tx => tx.timestamp > lastTx.timestamp);

    if (newTransactions.length) {
      dispatch({
        type: actionTypes.transactionsUpdated,
        data: {
          confirmed: newTransactions,
          count: response.meta.count,
        },
      });

      const account = await accountAPI.getSummary(activeToken, address);

      dispatch({
        type: actionTypes.accountUpdated,
        data: {
          account,
          activeToken,
        },
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
