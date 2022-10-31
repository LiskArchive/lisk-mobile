import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import apiClient from 'utilities/api/APIClient';

import { applicationsContextReducer } from './reducers';
import { useBlockchainApplicationExplorer } from '../hooks/useBlockchainApplicationExplorer';

const BlockchainApplicationsManagementContext = createContext();

/**
 * Context provider of Blockchain Applications Management. Pass down to children the applications and
 * current application state saved locally by the user.
 * @param {Object} children - React nodes to pass down as children.
 * @returns {Object} value - Blockchain applications state (data, isLoading, isError and error),
 * current application selected by the user and functions to dispatch the applications state and
 * current application.
 */
export function BlockchainApplicationsManagementProvider({ children }) {
  const [applications, dispatchApplications] = useReducer(applicationsContextReducer);

  const [currentApplication, setCurrentApplication] = useState();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useBlockchainApplicationExplorer({ applicationsConfig: { params: { isDefault: true } } });

  useEffect(() => {
    let _applications;

    if (!applications && applicationsData) {
      _applications = applicationsData;

      dispatchApplications({ type: 'set', payload: _applications });
    }

    if (_applications && !currentApplication) {
      setCurrentApplication(_applications[0]);

      apiClient.create(_applications[0].serviceURLs[0]);
    }
  }, [applicationsData, applications, currentApplication]);

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

/**
 * Allows to consume Blockchain Applications Management context value as hook.
 * @returns {Object} value - Blockchain Applications Management context value.
 */
export function useBlockchainApplicationsManagement() {
  return useContext(BlockchainApplicationsManagementContext);
}
