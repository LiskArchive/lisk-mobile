import { retrieveAccounts } from 'utilities/storage';
import actionTypes from '../actionTypes';
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
export const followedAccountsRetrieved = () => (dispatch) => {
  retrieveAccounts().then((accounts) => {
    if (accounts.LSK) {
      dispatch({
        type: actionTypes.followedAccountsRetrieved,
        data: accounts
      });
    } else {
      dispatch({
        type: actionTypes.followedAccountsRetrieved,
        data: { LSK: accounts, BTC: [] }
      });
    }
  });
};
