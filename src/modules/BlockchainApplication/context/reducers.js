/**
 * Reducer function for the Blockchain Applications Management context.
 * @param {Array} state - Current state of applications.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "set" applications, "add" application and "delete" application.
 * @returns {Array} state - The context state of saved applications.
 */
export function applicationsContextReducer(state, action) {
  switch (action.type) {
    case 'set':
      return action.payload;

    case 'add': {
      if (!state.find((app) => app.chainID === action.payload.chainID)) {
        return state;
      }

      return [...state, action.payload];
    }

    case 'delete':
      return state.filter((app) => app.chainID !== action.payload.chainID);

    default:
      return state;
  }
}
