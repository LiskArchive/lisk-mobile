import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencyKeys } from 'constants/currencies';
import { languageKeys } from 'constants/languages';
import { merge } from 'utilities/helpers';
import { themes } from 'constants/styleGuide';
import actionTypes from '../actionTypes';

export const INITIAL_STATE = {
  theme: themes.light,
  currency: currencyKeys[0],
  language: languageKeys[0],
  useDerivationPath: false,
  showDerivationPath: false,
  showedIntro: false,
  enableShakePhone: true,
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
  return settings;
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
      return merge(state, action.data);
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
