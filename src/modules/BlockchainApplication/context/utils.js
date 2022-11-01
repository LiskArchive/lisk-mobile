/**
 * Reducer function for the Blockchain Applications Management context.
 * @param {Array} state - Current state of applications.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "set" applications, "add" application and "delete" application.
 * @returns {Array} state - The context state of saved applications.
 */
export function applicationsContextReducer(state, { type, applications, application, chainID }) {
  switch (type) {
    case 'init':
      return applications;

    case 'add': {
      if (state.find((app) => app.chainID === application.chainID)) {
        return state;
      }

      return [...state, application];
    }

    case 'delete': {
      return state.filter((app) => app.chainID !== chainID);
    }

    default:
      return state;
  }
}
