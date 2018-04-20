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
      return Object.assign({}, state, { active: null });
    case actionTypes.accountLoggedIn:
      return Object.assign({}, state, { active: action.data });
    case actionTypes.accountFollowed:
      return Object.assign({}, state, {
        followed: [...state.followed.filter(item => item !== action.data), action.data] });
    case actionTypes.accountUnFollowed:
      return Object.assign({}, state, { followed: [...state.followed.filter(item => item !== action.data)] });
    case actionTypes.accountsRetrieved:
      return Object.assign({}, state, { followed: action.data });
    case actionTypes.accountsStored:
      return state;
    default:
      return state;
  }
};

export default accounts;
