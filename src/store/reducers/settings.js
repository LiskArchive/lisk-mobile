import actionTypes from '../../constants/actions';
import { currencyKeys } from '../../constants/currencies';
import { merge } from '../../utilities/helpers';
import { themes } from '../../constants/styleGuide';
import { tokenKeys } from '../../constants/tokens';

export const INITIAL_STATE = {
  theme: themes.light,
  currency: currencyKeys[0],
  token: {
    active: tokenKeys[0],
    list: tokenKeys.reduce((acc, key) => { acc[key] = true; return acc; }, {}),
  },
};

/**
 * Defines the active token. Reverts to LSK if the active token is disabled.
 *
 * @param {Object} actionToken - action.data.token value
 * @param {Object} stateToken - state.token value
 *
 * @returns {String} active token key
 */
const defineActiveToken = (actionToken, stateToken) => {
  if (!actionToken) return stateToken.active;
  if (actionToken.active && !actionToken.list) {
    return stateToken.list[actionToken.active] === true ? actionToken.active : stateToken.active;
  }

  const lastActiveToken = actionToken.active || stateToken.active;
  return actionToken.list[lastActiveToken] === false ? tokenKeys[0] : lastActiveToken;
};

/**
 * This reducer is designed to store and retrieve the saved data
 * for app general settings.
 *
 * @param {objec} state, initial state
 *
 * @returns {Object} The latest state
 */
const settings = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.settingsUpdated:
      return merge(state, action.data, {
        token: {
          active: defineActiveToken(action.data.token, state.token),
          list: action.data.token ? action.data.token.list : INITIAL_STATE.token.list,
        },
      });
    case actionTypes.settingsRetrieved:
      return merge(state, action.data);
    default:
      return state;
  }
};

export default settings;
