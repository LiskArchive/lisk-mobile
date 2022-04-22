import actionTypes from 'constants/actions';

/**
 * Returns a pure action object to remove the given account
 * from the list of followed accounts
 *
 * @param {String} account.address - Valid Lisk ID
 *
 * @returns {Object} - Pure action function
 */
export const accountUnFollowed = (address) => (dispatch, getState) => {
  const activeToken = getState().settings.token.active;
  dispatch({
    type: actionTypes.accountUnFollowed,
    data: {
      address,
      activeToken
    }
  });
};
