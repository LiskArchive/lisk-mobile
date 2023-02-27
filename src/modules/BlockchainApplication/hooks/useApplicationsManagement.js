/* eslint-disable max-statements */
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
    isLoading: isLoadingDefaultApplicationsFullData,
    isSuccess: isSuccessDefaultApplicationsFullData,
    error: errorOnDefaultApplicationsFullData,
    refetch: refetchDefaultApplicationsFullData,
  } = useApplicationsFullDataQuery({
    config: { params: { isDefault: true } },
  });

  const {
    data: applicationsStorageData,
    isLoading: isLoadingApplicationsStorageData,
    isSuccess: isSuccessApplicationsStorageData,
    error: errorOnApplicationsStorageData,
    addApplication: addApplicationToStorage,
    deleteApplication: deleteApplicationFromStorage,
  } = useApplicationsLocalStorage();

  const isSuccess = isSuccessDefaultApplicationsFullData && isSuccessApplicationsStorageData;
  const isLoading = isLoadingDefaultApplicationsFullData || isLoadingApplicationsStorageData;
  const error = errorOnDefaultApplicationsFullData || errorOnApplicationsStorageData;

  const addApplication = useCallback(
    async (application) => {
      try {
        await addApplicationToStorage(application.chainID);

        applications.dispatchData({ type: 'add', application });
      } catch (_error) {
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
      } catch (_error) {
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
    if (!applications.data && isSuccess) {
      applications.dispatchData({
        type: 'init',
        applications: joinArraysWithoutDuplicates(
          defaultApplicationsFullData?.data || [],
          applicationsStorageData?.data || [],
          'chainID'
        ),
      });
    }
  }, [applications, defaultApplicationsFullData, applicationsStorageData, isSuccess]);

  // Set applications status and error based on default applications on-chain
  // and off-chain data query results.
  useEffect(() => {
    applications.setIsLoading(isLoading);
  }, [isLoading, applications]);
  useEffect(() => {
    applications.setIsSuccess(isSuccess);
  }, [isSuccess, applications]);
  useEffect(() => {
    applications.setError(error);
  }, [error, applications]);

  return {
    applications,
    addApplication,
    deleteApplication,
    retry,
  };
}
