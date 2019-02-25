import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';
import { tokenKeys } from '../../constants/tokens';

export const INITIAL_STATE = {
  passphrase: null,
  followed: [],
  info: tokenKeys.reduce((info, tokenKey) => merge(info, {
    [tokenKey]: {},
  }), {}),
};

/**
 * @param {Object} state
 * @param {String} state.passphrase - Passphrase used to access active accounts
 * @param {Object} state.info - Accounts logged in
 * @param {Array} state.followed - List of followed accounts
 * @param {Object} action - Dispatched Redux Action
 * @returns {Object}
 */
const accounts = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.accountSignedIn:
      return merge(state, {
        passphrase: action.data.passphrase,
        info: {
          ...state.info,
          [action.data.activeToken]: action.data.account,
        },
      });

    case actionTypes.accountUpdated:
      return merge(state, {
        passphrase: state.passphrase,
        info: {
          ...state.info,
          [action.data.activeToken]: action.data.account,
        },
      });

    case actionTypes.accountSignedOut:
      return merge(state, { info: INITIAL_STATE.info, passphrase: null });

    case actionTypes.accountsRetrieved:
      return merge(state, { followed: action.data });

    case actionTypes.accountEdited:
      return merge(state, {
        followed: state.followed.map(i => (i.address === action.data.address ? action.data : i)),
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

    default:
      return state;
  }
};

export default accounts;
