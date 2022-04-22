import actionTypes from 'constants/actions';

/**
 * Returns a pure action object to edit/update the values of
 * a followed account
 *
 * @param {String} address - Valid Lisk Account
 * @param {Object} updatedData
 * @param {String} updatedData.address - Valid Lisk Account
 * @param {String} updatedData.label - A string title/label of length 3-18 chars
 *
 * @returns {Object} - Pure action function
 */
export const accountEdited = (address, label) => (dispatch, getState) => {
  const activeToken = getState().settings.token.active;
  dispatch({
    type: actionTypes.accountEdited,
    data: {
      account: {
        address,
        label
      },
      activeToken
    }
  });
};