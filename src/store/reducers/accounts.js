import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const accounts = (state = { list: [], active: -1 }, action) => {
  switch (action.type) {
    case accountUpdated:
      return state;
    case accountLoggedOut:
      return state;
    case accountLoggedIn:
      return state;
    case accountLocked:
      return state;
    case accountUnlocked:
      return state;
    case accountSetAsActive:
      return state;
    case accountsRetrieved:
      return state;
    case accountStored:
      return state;
    default:
      return state;
  }
};

export default accounts;
