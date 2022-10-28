import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

import { useApplicationsQuery } from '../api/useApplicationsQuery';
import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';

const BlockchainApplicationsManagementContext = createContext();

function applicationsReducer(state, action) {
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

export function BlockchainApplicationsManagementProvider({ children }) {
  const [applications, dispatchApplications] = useReducer(applicationsReducer);

  const [currentApplication, setCurrentApplication] = useState();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useApplicationsQuery({
    config: { baseURL: process.env.SERVICE_API_BASE_URL, params: { isDefault: true } },
  });

  const {
    data: applicationsMetaData,
    isLoading: isLoadingApplicationsMeta,
    isError: isErrorOnApplicationsMeta,
    error: errorOnApplicationsMeta,
  } = useApplicationsMetaQuery({
    options: {
      enabled: !!applicationsData?.data,
    },
    config: {
      baseURL: process.env.SERVICE_API_BASE_URL,
      params: {
        // TODO: Pass as CSV of chainIDs when backend supports feature.
        // e.g.: applicationsData?.data.map((app) => app.chainID)
        chainID: applicationsData?.data[0].chainID,
      },
    },
  });

  const isLoading = isLoadingApplications || isLoadingApplicationsMeta;
  const isError = isErrorOnApplications || isErrorOnApplicationsMeta;
  const error = errorOnApplications || errorOnApplicationsMeta;

  useEffect(() => {
    let _data;

    if (!applications && applicationsMetaData?.data && applicationsData?.data) {
      _data = applicationsMetaData.data.map((appMetadata) => {
        const app = applicationsData.data.find((_app) => _app.chainID === appMetadata.chainID);

        return { ...appMetadata, app };
      });

      dispatchApplications({ type: 'set', payload: _data });
    }

    if (_data && !currentApplication) {
      setCurrentApplication(_data[0]);
    }
  }, [applicationsData?.data, applicationsMetaData?.data, applications, currentApplication]);

  return (
    <BlockchainApplicationsManagementContext.Provider
      value={{
        applications: {
          data: applications,
          isLoading,
          isError,
          error,
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

export function useBlockchainApplicationsManagement() {
  return useContext(BlockchainApplicationsManagementContext);
}
