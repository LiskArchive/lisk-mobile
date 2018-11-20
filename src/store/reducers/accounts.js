import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';

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
const accounts = (state = { active: null, followed: [] }, action = {}) => {
  switch (action.type) {
    case actionTypes.accountUpdated:
      return merge(state, { active: merge(state.active, action.data) });
    case actionTypes.accountSignedOut:
      return merge(state, { active: null });
    case actionTypes.accountSignedIn:
      return merge(state, { active: action.data });
    case actionTypes.accountEdited:
      return merge(state, {
        followed: state.followed.map((item) => {
          if (item.address === action.data.address) return action.data;
          return item;
        }),
      });
    case actionTypes.accountFollowed:
      return merge(state, {
        followed: [...state.followed.filter(item =>
          item.address !== action.data.address), action.data],
      });
    case actionTypes.accountUnFollowed:
      return merge(state, {
        followed: [...state.followed.filter(item => item.address !== action.data)],
      });
    case actionTypes.accountsRetrieved:
      return merge(state, { followed: action.data });
    case actionTypes.accountsStored:
      return state;
    default:
      return state;
  }
};

export default accounts;
