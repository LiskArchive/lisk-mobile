import React, { createContext, useEffect, useReducer, useState } from 'react';

import apiClient from 'utilities/api/APIClient';
import { useApplicationsExplorer } from '../hooks/useApplicationsExplorer';

import { applicationsContextReducer, getApplicationsStorageData } from './utils';

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

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useApplicationsExplorer({ applicationsConfig: { params: { isDefault: true } } });

  useEffect(() => {
    if (!applications && applicationsData) {
      let _applications;

      getApplicationsStorageData().then((cachedApplications) => {
        if (cachedApplications) {
          _applications = cachedApplications.map((cachedApp) => {
            // eslint-disable-next-line max-nested-callbacks
            const updatedApp = applicationsData.find((app) => app.chainID === cachedApp.chainID);

            if (updatedApp) {
              return { ...cachedApp, ...updatedApp };
            }

            return cachedApp;
          });
        }

        dispatchApplications({ type: 'init', applications: _applications });
      });
    }

    if (!currentApplication && applicationsData) {
      setCurrentApplication(applicationsData[0]);

      apiClient.create(applicationsData[0].serviceURLs[0]);
    }
  }, [applicationsData, applications, currentApplication]);

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
