import { setBlockchainApplicationsStorageData } from './helpers';

/**
 * Reducer function for the Blockchain Applications Management context.
 * @param {Array} state - Current state of applications.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "set" applications, "add" application and "delete" application.
 * @returns {Array} state - The context state of saved applications.
 */
export function blockchainApplicationsContextReducer(state, { type, applications, application }) {
  switch (type) {
    case 'init':
      return applications;

    case 'add': {
      if (state.find((app) => app.chainID === application.chainID)) {
        return state;
      }

      const updatedState = [...state, application];

      setBlockchainApplicationsStorageData(updatedState);

      return updatedState;
    }

    case 'delete': {
      const updatedState = state.filter((app) => app.chainID !== application.chainID);

      setBlockchainApplicationsStorageData(updatedState);

      return updatedState;
    }

    default:
      return state;
  }
}
