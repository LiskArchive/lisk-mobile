import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';

/**
 * The reducer of transactions.
 * this reducer implements the required logic to add, update and reset
 * the list of transactions for the account we've logged in using.
 *
 * @param {Object} state
 * @param {Array} state.pending
 * @param {Array} state.confirmed
 * @param {Number} state.count
 * @param {Object} action
 * @param {String} action.type
 * @param {Object} action.data
 */
const transactions = (state = { pending: [], confirmed: [], count: null }, action) => {
  switch (action.type) {
    case actionTypes.transactionsLoaded:
      return merge(state, {
        confirmed: [
          ...state.confirmed,
          ...action.data.transactions,
        ],
        count: action.data.count,
      });
    case actionTypes.transactionAdded:
      return merge(state, {
        pending: [action.data, ...state.pending],
      });
    default:
      return state;
  }
};

export default transactions;
