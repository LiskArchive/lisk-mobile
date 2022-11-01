import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import apiClient from 'utilities/api/APIClient';
import { useApplicationsAsyncStorage } from '../hooks/useApplicationsAsyncStorage';
import { useApplicationsExplorer } from '../hooks/useApplicationsExplorer';

import { applicationsContextReducer } from './utils';

export const ApplicationsContext = createContext();

/**
 * Context provider of Blockchain Applications. Pass down to children the applications and
 * current application state saved locally by the user.
 * @param {Object} children - React nodes to pass down as children.
 * @returns {Object} value - Blockchain applications state (data, isLoading, isError and error),
 * current application selected by the user and functions to dispatch the applications state and
 * current application.
 */
export function ApplicationsProvider({ children }) {
  const [applications, dispatchApplications] = useReducer(applicationsContextReducer);

  const [currentApplication, setCurrentApplication] = useState();

  const { getApplications: getApplicationsStorageData } = useApplicationsAsyncStorage();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useApplicationsExplorer({ applicationsConfig: { params: { isDefault: true } } });

  useEffect(() => {
    if (!applications && applicationsData) {
      getApplicationsStorageData().then((cachedApplications) => {
        let _applications = [];

        if (cachedApplications) {
          _applications = cachedApplications.map((cachedChainID) =>
            // eslint-disable-next-line max-nested-callbacks
            applicationsData.find((app) => app.chainID === cachedChainID)
          );
        }

        dispatchApplications({ type: 'init', applications: _applications });
      });
    }

    if (!currentApplication && applicationsData) {
      setCurrentApplication(applicationsData[0]);

      apiClient.create(applicationsData[0].serviceURLs[0]);
    }
  }, [applicationsData, applications, currentApplication, getApplicationsStorageData]);

  return (
    <ApplicationsContext.Provider
      value={{
        applications: {
          data: applications,
          isLoading: isLoadingApplications,
          isError: isErrorOnApplications,
          error: errorOnApplications,
        },
        dispatchApplications,
        currentApplication,
        setCurrentApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

/**
 * Allows to consume Blockchain Applications context value as hook.
 * @returns {Object} value - Blockchain Applications context value.
 */
export function useApplications() {
  return useContext(ApplicationsContext);
}
