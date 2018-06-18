import actionTypes from '../constants/actions';
import { retrieveAccounts, storeAccounts } from '../utilities/storage';
import { getAccount, extractAddress } from '../utilities/api/account';

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
 *
 * @returns {Object} - Pure action function
 */
export const accountFollowed = address => ({
  type: actionTypes.accountFollowed,
  data: address,
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
 * Uses Http call to fetch Account and delegate info of a given
 * passphrase and dispatches accountLoggedIn action
 *
 * @todo Implement delegate Api call
 *
 * @param {Object} data
 * @param {String} data.passphrase - The valid passphrase to login using
 * @returns {Function} Thunk function
 */
export const accountLoggedIn = ({ passphrase }) =>
  (dispatch, getState) => {
    const { activePeer } = getState().peers;
    getAccount(activePeer, extractAddress(passphrase))
      .then((account) => {
        dispatch({
          type: actionTypes.accountLoggedIn,
          data: { ...account, passphrase },
        });
      });
  };
/**
 * Returns action object with no Api calls.
 *
 * @returns {Object} Action object including action type
 */
export const accountLoggedOut = () =>
  ({
    type: actionTypes.accountLoggedOut,
  });
