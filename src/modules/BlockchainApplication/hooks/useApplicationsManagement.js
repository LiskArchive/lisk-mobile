/* eslint-disable max-statements */
import { useCallback, useEffect } from 'react';

import { useApplications } from '../context/ApplicationsContext';
import { useApplicationsLocalStorage } from './useApplicationsLocalStorage';
import { APPLICATIONS_STORAGE_KEY } from '../constants';
import { useApplicationsFullDataQuery } from '../api/useApplicationsFullDataQuery';
import { joinArraysWithoutDuplicates } from '../../../utilities/helpers';

/**
 * Provides an API to add, delete and read the blockchain applications saved by the user.
 * @returns {Object} - Applications (data, loading and error states), addApplication
 * callback and deleteApplication callback.
 */
export function useApplicationsManagement() {
  const { applications } = useApplications();

  // Fetch default apps of-chain and on-chain data from server and merges results.
  const {
    data: defaultApplicationsMetaData,
    status: defaultApplicationsMetaDataStatus,
    refetch: refetchApplicationsMetaData,
    error: errorOnDefaultApplicationsMetaData,
  } = useApplicationsFullDataQuery({
    config: { params: { isDefault: true } },
  });

  const {
    data: applicationsStorageData,
    addApplication: addApplicationToStorage,
    deleteApplication: deleteApplicationFromStorage,
  } = useApplicationsLocalStorage(APPLICATIONS_STORAGE_KEY);

  const addApplication = useCallback(
    (application) =>
      addApplicationToStorage(application.chainID).then(() =>
        applications.dispatchData({ type: 'add', application })
      ),
    [addApplicationToStorage, applications]
  );

  const deleteApplication = useCallback(
    (chainID) =>
      deleteApplicationFromStorage(chainID).then(() =>
        applications.dispatchData({ type: 'delete', chainID })
      ),
    [deleteApplicationFromStorage, applications]
  );

  const retry = useCallback(() => refetchApplicationsMetaData(), [refetchApplicationsMetaData]);

  // Init applications management data by merging API calls results with user local
  // stored applications.
  useEffect(() => {
    if (!applications.data && defaultApplicationsMetaData.data && applicationsStorageData?.data) {
      applications.dispatchData({
        type: 'init',
        applications: joinArraysWithoutDuplicates(
          defaultApplicationsMetaData.data,
          applicationsStorageData.data,
          'chainID'
        ),
      });
    }
  }, [applications, defaultApplicationsMetaData, applicationsStorageData]);

  // Set applications status and error based on default applications on-chain
  // and off-chain data query status.
  useEffect(() => {
    applications.setStatus(defaultApplicationsMetaDataStatus);
  }, [defaultApplicationsMetaDataStatus, applications]);
  useEffect(() => {
    applications.setError(errorOnDefaultApplicationsMetaData);
  }, [errorOnDefaultApplicationsMetaData, applications]);

  return {
    applications,
    addApplication,
    deleteApplication,
    retry,
  };
}
