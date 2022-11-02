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

/**
 * Gets the applications array to provide to ApplicationsContext on app mount.
 * @param {Array} applications - All available applications data (fetched from the server).
 * @param {Array} defaultApplications - All default applications data (fetched from the server).
 * @param {Array} cachedChainIDs - Saved on local storage by the user applications chainIDs.
 * @returns {Array} Applications to insert on the ApplicationsContext first value.
 */
export function getInitContextApplications({
  applications,
  defaultApplications,
  cachedChainIDs = [],
}) {
  let cachedApplicationsQueue = applications.filter((app) => cachedChainIDs.includes(app.chainID));

  let initApplications = defaultApplications.reduce((acc, defaultApplication) => {
    const cachedApplication = cachedApplicationsQueue.find(
      (cachedApplicationInQueue) => cachedApplicationInQueue.chainID === defaultApplication.chainID
    );

    if (cachedApplication) {
      cachedApplicationsQueue = cachedApplicationsQueue.filter(
        (cachedApplicationInQueue) => cachedApplicationInQueue.chainID !== cachedApplication.chainID
      );

      if (!defaultApplications.find((accApp) => accApp.chainID === cachedApplication.chainID)) {
        return [...acc, { ...cachedApplication, ...defaultApplication }];
      }
    }

    return [...acc, defaultApplication];
  }, []);

  if (cachedApplicationsQueue.length > 0) {
    initApplications = initApplications.concat(cachedApplicationsQueue);
  }

  return initApplications;
}
