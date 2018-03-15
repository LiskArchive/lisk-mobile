import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const accounts = (state = { list: [], active: -1 }, action) => {
  switch (action.type) {
    case actionTypes.accountUpdated:
      return state;
    case actionTypes.accountLoggedOut:
      return state;
    case actionTypes.accountLoggedIn:
      return Object.assign({}, { list: [...state.list, action.data], active: 0 });
    case actionTypes.accountLocked:
      return state;
    case actionTypes.accountUnlocked:
      return state;
    case actionTypes.accountSetAsActive:
      return state;
    case actionTypes.accountsRetrieved:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default accounts;
