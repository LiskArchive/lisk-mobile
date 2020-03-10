import actionTypes from '../../constants/actions';
import { merge } from '../../utilities/helpers';
import { tokenKeys } from '../../constants/tokens';

export const INITIAL_STATE = {
  passphrase: null,
  followed: tokenKeys.reduce(
    (info, tokenKey) =>
      merge(info, {
        [tokenKey]: [],
      }),
    {}
  ),
  info: tokenKeys.reduce(
    (info, tokenKey) =>
      merge(info, {
        [tokenKey]: {},
      }),
    {}
  ),
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
        info: action.data.info,
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

    case actionTypes.followedAccountsRetrieved:
      return merge(state, { followed: action.data });

    case actionTypes.accountEdited: {
      const { account, activeToken } = action.data;
      return merge(state, {
        followed: tokenKeys.reduce(
          (info, tokenKey) =>
            merge(info, {
              [tokenKey]:
                tokenKey === activeToken
                  ? state.followed[tokenKey].map(i =>
                    i.address === account.address ? account : i)
                  : state.followed[tokenKey],
            }),
          {}
        ),
      });
    }

    case actionTypes.accountFollowed: {
      const { account, activeToken } = action.data;
      return merge(state, {
        followed: tokenKeys.reduce(
          (info, tokenKey) =>
            merge(info, {
              [tokenKey]:
                tokenKey === activeToken
                  ? [
                    ...state.followed[tokenKey].filter(
                      item => item.address !== account.address
                    ),
                    account,
                  ]
                  : state.followed[tokenKey],
            }),
          {}
        ),
      });
    }

    case actionTypes.accountUnFollowed:
      return merge(state, {
        followed: tokenKeys.reduce(
          (info, tokenKey) =>
            merge(info, {
              [tokenKey]:
                tokenKey === action.data.activeToken
                  ? state.followed[tokenKey].filter(
                    item => item.address !== action.data.address
                  )
                  : state.followed[tokenKey],
            }),
          {}
        ),
      });

    default:
      return state;
  }
};

export default accounts;
