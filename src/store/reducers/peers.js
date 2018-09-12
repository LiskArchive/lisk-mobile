import actionTypes from '../../constants/actions';

/**
 * The reducer for maintaining active peer
 *
 * @param {Array} state - the current state object
 * @param {Object} action - The action containing type and data
 *
 * @returns {Object} - Next state object
 */
const peers = (state = { activePeer: null }, action = {}) => {
  switch (action.type) {
    case actionTypes.activePeerSet:
    case actionTypes.activePeerUpdated:
      return Object.assign({}, state, {
        activePeer: action.data,
      });
    default:
      return state;
  }
};

export default peers;
