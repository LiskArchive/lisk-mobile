/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PINNED_APPLICATIONS_STORAGE_KEY } from '../constants';

/**
 * Reads, adds and deletes pinned applications chainIDs from device's
 * local storage.
 * @returns {Object} Callbacks to read, add and delete pins from local storage
 * as well as the status and error (if any) of the async operation.
 */
export function usePinApplicationsLocalStorage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();

  const getPins = useCallback(async () => {
    let applications;

    setError(undefined);
    setStatus('initializing');

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(PINNED_APPLICATIONS_STORAGE_KEY);

      setStatus('idle');

      applications =
        cachedApplicationsJSON != null ? JSON.parse(cachedApplicationsJSON) : undefined;

      return applications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return applications;
    }
  }, []);

  const addPin = useCallback(async (chainID) => {
    let updatedApplications;

    setError(undefined);
    setStatus('adding');

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(PINNED_APPLICATIONS_STORAGE_KEY);

      const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

      const payload = JSON.stringify([...cachedApplications, chainID]);

      updatedApplications = await AsyncStorage.setItem(PINNED_APPLICATIONS_STORAGE_KEY, payload);

      setStatus('idle');

      return updatedApplications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return updatedApplications;
    }
  }, []);

  const deletePin = useCallback(async (chainID) => {
    let updatedApplications;

    setError(undefined);
    setStatus('deleting');

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(PINNED_APPLICATIONS_STORAGE_KEY);

      const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

      const payload = JSON.stringify(
        cachedApplications.filter((cachedChainID) => cachedChainID !== chainID)
      );

      updatedApplications = await AsyncStorage.setItem(PINNED_APPLICATIONS_STORAGE_KEY, payload);

      setStatus('idle');

      return updatedApplications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return updatedApplications;
    }
  }, []);

  return {
    status,
    error,
    getPins,
    addPin,
    deletePin,
  };
}
