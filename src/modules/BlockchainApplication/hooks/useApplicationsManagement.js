import { useCallback, useEffect } from 'react';
import i18next from 'i18next';

import DropDownHolder from 'utilities/alert';
import { joinArraysWithoutDuplicates } from 'utilities/helpers';
import { useApplications } from '../context/ApplicationsContext';
import { useApplicationsLocalStorage } from './useApplicationsLocalStorage';
import { useApplicationsFullDataQuery } from '../api/useApplicationsFullDataQuery';

/**
 * Provides an API to add, delete and read the blockchain applications saved by the user.
 * @returns {Object} - Applications (data, loading and error states), addApplication
 * callback and deleteApplication callback.
 */
export function useApplicationsManagement() {
  const { applications } = useApplications();

  // Fetch default apps of-chain and on-chain data from server and merges results.
  const {
    data: defaultApplicationsFullData,
    status: defaultApplicationsFullDataStatus,
    refetch: refetchDefaultApplicationsFullData,
    error: errorOnDefaultApplicationsFullData,
  } = useApplicationsFullDataQuery({
    config: { params: { isDefault: true } },
  });

  const {
    data: applicationsStorageData,
    addApplication: addApplicationToStorage,
    deleteApplication: deleteApplicationFromStorage,
  } = useApplicationsLocalStorage();

  const addApplication = useCallback(
    async (application) => {
      try {
        await addApplicationToStorage(application.chainID);

        applications.dispatchData({ type: 'add', application });
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          'Error adding application. Please try again later.'
        );
      }
    },
    [addApplicationToStorage, applications]
  );

  const deleteApplication = useCallback(
    async (chainID) => {
      try {
        await deleteApplicationFromStorage(chainID);

        applications.dispatchData({ type: 'delete', chainID });
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          'Error deleting application. Please try again later.'
        );
      }
    },
    [deleteApplicationFromStorage, applications]
  );

  const retry = useCallback(
    () => refetchDefaultApplicationsFullData(),
    [refetchDefaultApplicationsFullData]
  );

  // Init applications management data by merging API calls results with user local
  // stored applications.
  useEffect(() => {
    if (!applications.data && defaultApplicationsFullData.data && applicationsStorageData?.data) {
      applications.dispatchData({
        type: 'init',
        applications: joinArraysWithoutDuplicates(
          defaultApplicationsFullData.data,
          applicationsStorageData.data,
          'chainID'
        ),
      });
    }
  }, [applications, defaultApplicationsFullData, applicationsStorageData]);

  // Set applications status and error based on default applications on-chain
  // and off-chain data query results.
  useEffect(() => {
    applications.setStatus(defaultApplicationsFullDataStatus);
  }, [defaultApplicationsFullDataStatus, applications]);
  useEffect(() => {
    applications.setError(errorOnDefaultApplicationsFullData);
  }, [errorOnDefaultApplicationsFullData, applications]);

  return {
    applications,
    addApplication,
    deleteApplication,
    retry,
  };
}
