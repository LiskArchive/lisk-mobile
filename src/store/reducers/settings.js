import actionTypes from '../../constants/actions';
import { currencyKeys } from '../../constants/currencies';
import { merge } from '../../utilities/helpers';
import { themes } from '../../constants/styleGuide';

export const INITIAL_STATE = {
  theme: themes.light,
  currency: currencyKeys[0],
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
    case actionTypes.settingsRetrieved:
      return merge(state, action.data);
    default:
      return state;
  }
};

export default settings;
