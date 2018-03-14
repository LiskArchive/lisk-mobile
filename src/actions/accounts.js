import actionTypes from "../constants/actions";
import { retrieveAccounts, storeAccounts } from '../utilities/storage';
import { getAccount, extractAddress } from '../utilities/http';

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
export const accountsStored = (data) =>
  (dispatch) => {
    storeAccounts(data)
      .then(() => {
        dispatch({
          type: actionTypes.accountsStored,
        });
      });
  }

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
  }

export const accountLoggedIn = ({ passphrase }) =>
  (dispatch) => {
    console.log('Fetching');
    getAccount(extractAddress(passphrase))
      .then((account) => {
        console.log('Account Fetched', account);
        dispatch({
          type: actionTypes.accountLoggedIn,
          data: accounts,
        });
      });
  }
