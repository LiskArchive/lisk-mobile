/* eslint-disable complexity */
/* eslint-disable max-statements */
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { LIMIT, API_URL, METHOD } from 'utilities/api/constants';
import { GET_APPLICATIONS_META_QUERY, APPLICATION } from 'utilities/api/queries';
import { transformApplicationsMetaQueryResult } from '../utils';
import { APPLICATIONS_STORAGE_KEY } from '../constants';

/**
 * Reads, adds and deletes applications from device local storage.
 * @returns {Object} The stored applications array, callbacks to read, add and delete
 * pins from local storage as well as the status and error (if any) of the async
 * operation.
 */
export function useApplicationsLocalStorage() {
  const [localStorageData, setLocalStorageData] = useState();
  const [isLoadingLocalStorageData, setIsLoadingLocalStorageData] = useState(true);
  const [isSuccessLocalStorageData, setIsSuccessLocalStorageData] = useState();
  const [errorOnLocalStorageData, setErrorOnLocalStorageData] = useState();

  const queryConfig = {
    url: `${API_URL}/blockchain/apps/meta`,
    method: 'get',
    event: 'get.blockchain.apps.meta',
    transformResult: transformApplicationsMetaQueryResult,
    params: {
      network: process.env.NETWORK,
      limit: LIMIT,
      chainID: localStorageData && localStorageData.join(','),
    },
  };

  const {
    data: applicationsData,
    isInitialLoading: isLoadingApplicationsData,
    isSuccess: isSuccessApplicationsData,
    error: errorOnApplicationsData,
  } = useCustomQuery({
    keys: [GET_APPLICATIONS_META_QUERY, queryConfig, APPLICATION, METHOD],
    options: {
      enabled: !!(isSuccessLocalStorageData && localStorageData?.length > 0),
    },
    config: queryConfig,
  });

  const resetState = () => {
    setLocalStorageData(undefined);
    setIsSuccessLocalStorageData(undefined);
    setErrorOnLocalStorageData(undefined);
  };

  const addApplication = useCallback(
    async (chainID) => {
      let updatedApplications;

      resetState();
      setIsLoadingLocalStorageData(true);

      try {
        const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

        const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

        const payload = JSON.stringify([...cachedApplications, chainID]);

        updatedApplications = await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, payload);

        setIsSuccessLocalStorageData(true);
        setIsLoadingLocalStorageData(false);

        setLocalStorageData(updatedApplications);

        return applicationsData;
      } catch (_error) {
        setErrorOnLocalStorageData(_error);
        setIsLoadingLocalStorageData(false);
        setIsSuccessLocalStorageData(false);

        return applicationsData;
      }
    },
    [applicationsData]
  );

  const deleteApplication = useCallback(
    async (chainID) => {
      let updatedApplications;

      resetState();
      setIsLoadingLocalStorageData(true);

      try {
        const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

        const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

        const payload = JSON.stringify(
          cachedApplications.filter((cachedChainID) => cachedChainID !== chainID)
        );

        updatedApplications = await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, payload);

        setIsSuccessLocalStorageData(true);
        setIsLoadingLocalStorageData(false);

        setLocalStorageData(updatedApplications);

        return applicationsData;
      } catch (_error) {
        setErrorOnLocalStorageData(_error);
        setIsLoadingLocalStorageData(false);
        setIsSuccessLocalStorageData(false);

        return applicationsData;
      }
    },
    [applicationsData]
  );

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      let applications;

      resetState();

      try {
        const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

        applications =
          cachedApplicationsJSON != null ? JSON.parse(cachedApplicationsJSON) : undefined;

        setIsLoadingLocalStorageData(false);

        setIsSuccessLocalStorageData(true);

        setLocalStorageData(applications);

        return applications;
      } catch (_error) {
        setErrorOnLocalStorageData(_error);
        setIsLoadingLocalStorageData(false);
        setIsSuccessLocalStorageData(false);

        return applications;
      }
    };

    if (!localStorageData) {
      fetchDataFromLocalStorage();
    }
  }, [localStorageData, applicationsData]);

  const isLoading = isLoadingLocalStorageData || isLoadingApplicationsData;
  const isSuccess = isSuccessLocalStorageData && isSuccessApplicationsData;
  const error = errorOnLocalStorageData || errorOnApplicationsData;

  return {
    data: applicationsData,
    isLoading,
    isSuccess,
    error,
    addApplication,
    deleteApplication,
  };
}
