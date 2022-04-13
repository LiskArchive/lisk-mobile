import actionTypes from 'constants/actions';
import { getSettings } from 'utilities/storage';

/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @param {String} address - Valid Lisk Account
 * @param {String} label - A custom string of length 3-16
 *
 * @returns {Object} - Pure action function
 */
// eslint-disable-next-line import/prefer-default-export
export const settingsUpdated = data => ({
  type: actionTypes.settingsUpdated,
  data,
});

/**
 * Reads the settings from the storage
 * and notifies the store about it accordingly
 *
 * @todo Rejection must is not handled
 *
 * @returns {Function} Thunk action function
 */
export const settingsRetrieved = () => dispatch => getSettings().then(data => {
  if (!data.theme) {
    data.theme = 'light';
  }

  dispatch({
    type: actionTypes.settingsRetrieved,
    data,
  });
});
