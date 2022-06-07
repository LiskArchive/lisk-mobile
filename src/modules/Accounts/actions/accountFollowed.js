import actionTypes from '../actionTypes';
/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @param {String} address - Valid Lisk Account
 * @param {String} label - A custom string of length 3-16
 *
 * @returns {Object} - Pure action function
 */
export const accountFollowed = (address, label) => (dispatch, getState) => {
  const activeToken = getState().settings.token.active;
  dispatch({
    type: actionTypes.accountFollowed,
    data: {
      account: { address, label },
      activeToken
    }
  });
};
