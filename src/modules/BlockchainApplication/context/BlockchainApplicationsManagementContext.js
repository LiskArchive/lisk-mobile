import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react';

import apiClient from 'utilities/api/APIClient';
import { useBlockchainApplicationExplorer } from '../hooks/useBlockchainApplicationExplorer';

import { blockchainApplicationsContextReducer } from './reducers';
import { getBlockchainApplicationsStorageData } from './helpers';

export const BlockchainApplicationsManagementContext = createContext();

/**
 * Context provider of Blockchain Applications Management. Pass down to children the applications and
 * current application state saved locally by the user.
 * @param {Object} children - React nodes to pass down as children.
 * @returns {Object} value - Blockchain applications state (data, isLoading, isError and error),
 * current application selected by the user and functions to dispatch the applications state and
 * current application.
 */
export function BlockchainApplicationsManagementProvider({ children }) {
  const [applications, dispatchApplications] = useReducer(blockchainApplicationsContextReducer);

  const [currentApplication, setCurrentApplication] = useState();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useBlockchainApplicationExplorer({ applicationsConfig: { params: { isDefault: true } } });

  const getCachedApplications = useCallback(() => getBlockchainApplicationsStorageData(), []);

  useEffect(() => {
    let _applications;

    if (!applications && applicationsData) {
      getCachedApplications().then((cachedApplications) => {
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
  }, [applicationsData, applications, currentApplication, getCachedApplications]);

  console.log({ applications });

  return (
    <BlockchainApplicationsManagementContext.Provider
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
    </BlockchainApplicationsManagementContext.Provider>
  );
}
