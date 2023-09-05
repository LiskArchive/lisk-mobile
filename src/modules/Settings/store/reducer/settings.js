import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyKeys } from 'constants/currencies';
import { languageKeys } from 'constants/languages';
import { merge } from 'utilities/helpers';
import { themes } from 'constants/styleGuide';
import { tokenKeys } from 'constants/tokens';
import actionTypes from '../actionTypes';

export const INITIAL_STATE = {
  theme: themes.light,
  currency: currencyKeys[0],
  language: languageKeys[0],
  useDerivationPath: false,
  showDerivationPath: false,
  showedIntro: false,
  enableShakePhone: true,
  token: {
    active: tokenKeys[0],
    list: tokenKeys.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}),
  },
};

/**
 * If the settings read from the Async storage
 * indicates a fiat currency that is not active anymore
 * this function reverts to Euro.
 * It also makes the default selected active token to LSK
 * @param {Object} settings - Full settings Object
 * @returns {Object} Setting object
 */
const fallback = (settings) => {
  settings.currency = currencyKeys.includes(settings.currency)
    ? settings.currency
    : currencyKeys[0];
  settings.token.active = tokenKeys[0];
  return settings;
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
 * @param {Object} state, initial state
 *
 * @returns {Object} The latest state
 */
export const settings = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.settingsUpdated:
      return merge(state, action.data, {
        token: {
          active: defineActiveToken(action.data.token, state.token),
          list: action.data.token ? action.data.token.list : state.token.list,
        },
      });
    case actionTypes.settingsRetrieved:
      return merge(state, fallback(action.data));
    default:
      return state;
  }
};

const persistConfig = {
  key: 'settings',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, settings);
