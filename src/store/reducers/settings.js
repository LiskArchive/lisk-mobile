import actionTypes from '../../constants/actions';
import { themes } from '../../constants/styleGuide';

/**
 * This reducer is designed to store and retrieve the required data
 * for displaying a loader spinner in a desired order
 *
 * @param {Array} state - An array of strings as ID value of each
 * action calling the loader
 *
 * @returns {Object} The latest state
 */
const settings = (state = { theme: themes.light }, action = {}) => {
  switch (action.type) {
    case actionTypes.settingsUpdated:
    case actionTypes.settingsRetrieved:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default settings;
