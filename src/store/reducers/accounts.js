import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const accounts = (state = { active: null, followed: [] }, action) => {
  switch (action.type) {
    case actionTypes.accountUpdated:
      return state;
    case actionTypes.accountLoggedOut:
      return Object.assign({}, { active: null });
    case actionTypes.accountLoggedIn:
      return Object.assign({}, { active: action.data });
    case actionTypes.accountFollowed:
      return state;
    case actionTypes.accountUnFollowed:
      return state;
    case actionTypes.accountsRetrieved:
      return Object.assign({}, state, { followed: action.data });
    case actionTypes.accountsStored:
      return state;
    default:
      return state;
  }
};

export default accounts;
