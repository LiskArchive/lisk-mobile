import actionTypes from '../../constants/actions';

/**
 * This reducer is designed to define the required logics to
 * store and retrieve the data related to:
 *  - The account we are logged in with.
 *  - The accounts we store for ease of access in Explorer section
 *
 * @param {Object} state
 * @param {Number} state.active - The account we are logged in with
 * @param {Array} state.followed - The list of followed accounts
 *
 * @returns {Object} The latest state
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
        followed: [...state.followed.filter(item => item !== action.data), action.data],
      });
    case actionTypes.accountUnFollowed:
      return Object.assign({}, state, {
        followed: [...state.followed.filter(item => item !== action.data)],
      });
    case actionTypes.accountsRetrieved:
      return Object.assign({}, state, { followed: action.data });
    case actionTypes.accountsStored:
      return state;
    default:
      return state;
  }
};

export default accounts;
