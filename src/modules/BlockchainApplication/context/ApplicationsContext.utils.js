/**
 * Applications reducer function for the Blockchain Applications context.
 * @param {Array} state - Current state of applications.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "init" applications, "add" an application or "delete" an application.
 * @returns {Array} state - The context state of saved applications.
 */
export function applicationsContextReducer(
  state = [],
  { type, applications, application, chainID } = {}
) {
  switch (type) {
    case 'init':
      return applications;

    case 'add': {
      if (state?.find((app) => app.chainID === application.chainID)) {
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

/**
 * Pins reducer function for the Blockchain Applications context.
 * @param {Array} state - Current state of pins.
 * @param {Object} action - Action to dispatch for updating the state.
 * Can be "init" pins, "add" a pin or "delete" a pin.
 * @returns {Array} state - The context state of saved pins (chainIDs).
 */
export function applicationPinsContextReducer(state = [], { type, pins, chainID } = {}) {
  switch (type) {
    case 'init':
      return pins;

    case 'add': {
      if (state.includes(chainID)) {
        return state;
      }

      return [...state, chainID];
    }

    case 'delete': {
      return state.filter((_chainID) => _chainID !== chainID);
    }

    default:
      return state;
  }
}
