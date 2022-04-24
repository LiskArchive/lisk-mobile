import { account as accountAPI } from 'utilities/api';
import { followedAccountsRetrieved } from './followedAccountsRetrieved';
import actionTypes from '../actionTypes';

/**
 * Extracts the addresses for all enabled tokens from
 * the given passphrase and stores them in account info dictionary
 * Also stores the passphrase ein accounts.
 *
 * @param {Object} data
 * @param {String} data.passphrase - The valid passphrase to sign in using
 * @returns {Function} Thunk function
 */
export const accountSignedIn = ({ passphrase }) =>
  (dispatch, getState) => {
    const tokens = getState().settings.token.list;
    const info = Object.keys(tokens)
      .reduce((accounts, token) => {
        const address1 = accountAPI.extractAddress(token, passphrase);
        accounts[token] = { address: address1 };
        return accounts;
      }, {});

    dispatch({
      type: actionTypes.accountSignedIn,
      data: {
        info,
        passphrase
      }
    });
    dispatch(followedAccountsRetrieved());
  };
