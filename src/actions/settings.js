import actionTypes from '../constants/actions';

/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @param {String} address - Valid Lisk ID
 * @param {String} label - A custom string of length 3-16
 *
 * @returns {Object} - Pure action function
 */
// eslint-disable-next-line import/prefer-default-export
export const settingsUpdated = data => ({
  type: actionTypes.settingsUpdated,
  data,
});
