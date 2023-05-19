/* eslint-disable max-statements */
import { useCallback, useEffect } from 'react';

import apiClient from 'utilities/api/APIClient';
import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';
import { useApplicationsQuery } from '../api/useApplicationsQuery';
import { useApplications } from '../context/ApplicationsContext';
import { getCurrentApplicationData } from '../utils';

/**
 * Handles current application bootstrap process by:
 * 1. Fetch default apps from metadata endpoint.
 * 2. Create Client Api with first element of default apps.
 * 3. Fetch default app on-chain data.
 * 4. Merge on-chain and off-chain data of defaultApplication.
 * 5. Set currentApplication with the merged data.
 * @returns - A callback to retry the bootstrap process.
 */
export function useBootstrapCurrentApplication() {
  const { currentApplication } = useApplications();

  // Fetch default apps metadata from server.
  const {
    data: defaultApplicationsMetaData,
    status: defaultApplicationsMetaDataStatus,
    refetch: refetchApplicationsMetaData,
    error: errorOnDefaultApplicationsMetaData,
  } = useApplicationsMetaQuery({
    config: { params: { isDefault: true } },
  });

  // Fetch default app on-chain data based on defined API client.
  const {
    data: defaultApplicationsData,
    status: defaultApplicationsDataStatus,
    refetch: refetchApplicationsData,
    error: errorOnDefaultApplicationsData,
  } = useApplicationsQuery({
    options: {
      enabled: !!defaultApplicationsMetaData?.data,
    },
    config: {
      params: {
        chainID: defaultApplicationsMetaData?.data[0].chainID,
      },
    },
  });

  const retry = useCallback(() => {
    refetchApplicationsMetaData();
    refetchApplicationsData();
  }, [refetchApplicationsMetaData, refetchApplicationsData]);

  // Create Client API with first element of default apps
  useEffect(() => {
    if (defaultApplicationsMetaData?.data[0].serviceURLs) {
      apiClient.create(defaultApplicationsMetaData?.data[0].serviceURLs[0]);
    }
  }, [defaultApplicationsMetaData?.data]);

  // Set currentApplication with the merged data from default application on-chain and
  // off-chain data.
  useEffect(() => {
    if (
      !currentApplication.data &&
      defaultApplicationsMetaData?.data &&
      defaultApplicationsData?.data
    ) {
      const currentApplicationData = getCurrentApplicationData(
        defaultApplicationsMetaData.data,
        defaultApplicationsData.data
      );

      currentApplication.setData(currentApplicationData);
    }
  }, [defaultApplicationsMetaData?.data, defaultApplicationsData?.data, currentApplication]);

  // Set current application status and error based on default applications on-chain
  // and off-chain data query statuses.
  useEffect(() => {
    currentApplication.setStatus(defaultApplicationsMetaDataStatus);
  }, [defaultApplicationsMetaDataStatus, currentApplication]);
  useEffect(() => {
    currentApplication.setStatus(defaultApplicationsDataStatus);
  }, [defaultApplicationsDataStatus, currentApplication]);
  useEffect(() => {
    const error = errorOnDefaultApplicationsData || errorOnDefaultApplicationsMetaData;

    if (error) {
      currentApplication.setError(error);
      currentApplication.setStatus('error');
    }
  }, [errorOnDefaultApplicationsData, errorOnDefaultApplicationsMetaData, currentApplication]);

  return retry;
}
