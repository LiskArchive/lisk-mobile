import actionTypes from '../../constants/actions';

/**
 * The reducer for maintaining active peer
 *
 * @param {Array} state - the current state object
 * @param {Object} action - The action containing type and data
 *
 * @returns {Object} - Next state object
 */
const peers = (state = { status: {}, options: {} }, action) => {
  switch (action.type) {
    case actionTypes.activePeerSet:
      return Object.assign({}, state, {
        data: action.data,
        options: action.data.options,
        status: true,
      });
    case actionTypes.activePeerUpdated:
      return Object.assign({}, state, { status: action.data });
    default:
      return state;
  }
};

export default peers;
