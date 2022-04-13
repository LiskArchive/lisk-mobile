import actionTypes from 'constants/actions';
import { account as accountAPI } from 'utilities/api';

/**
 * Updates redux store with network status
 * @returns {Function} Thunk action function
 */
export const networkInfoUpdated = (data) => (dispatch) => dispatch({
  type: actionTypes.networkInfoUpdated,
  data
});

/**
 * Returns a pure action object to store the given account
 * in the list of followed accounts
 *
 * @returns {Object} - Pure action function
 */
export const getNetworkInfo = () => async (dispatch) => {
  const data = await accountAPI.getNetworkInfo();
  dispatch(networkInfoUpdated(data));
};
