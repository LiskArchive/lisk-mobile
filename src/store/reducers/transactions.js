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
      });
    case actionTypes.transactionAdded:
      return merge(state, {
        pending: [action.data, ...state.pending],
      });
    case actionTypes.transactionsUpdated:
      return Object.assign({}, state, {
        // Filter any newly confirmed transaction from pending
        pending: state.pending.filter(pendingTransaction =>
          action.data.confirmed.filter(transaction =>
            transaction.id === pendingTransaction.id).length === 0),
        // Add any newly confirmed transaction to confirmed
        confirmed: [
          ...action.data.confirmed,
          ...state.confirmed.filter(confirmedTransaction =>
            action.data.confirmed.filter(transaction =>
              transaction.id === confirmedTransaction.id).length === 0),
        ],
        count: action.data.count,
      });
    default:
      return state;
  }
};

export default transactions;
