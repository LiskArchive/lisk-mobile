/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useApplicationsStorage(storageKey) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();

  const getApplications = useCallback(async () => {
    let applications;

    setStatus('initializing');

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(storageKey);

      setStatus('idle');

      applications =
        cachedApplicationsJSON != null ? JSON.parse(cachedApplicationsJSON) : undefined;

      return applications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return applications;
    }
  }, [storageKey]);

  const addApplication = useCallback(
    async (chainID) => {
      setStatus('adding');

      let updatedApplications;

      try {
        const cachedApplicationsJSON = await AsyncStorage.getItem(storageKey);

        const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

        const payload = JSON.stringify([...cachedApplications, chainID]);

        updatedApplications = await AsyncStorage.setItem(storageKey, payload);

        setStatus('idle');

        return updatedApplications;
      } catch (_error) {
        setError(_error);

        setStatus('idle');

        return updatedApplications;
      }
    },
    [storageKey]
  );

  const deleteApplication = useCallback(
    async (chainID) => {
      setStatus('deleting');

      let updatedApplications;

      try {
        const cachedApplicationsJSON = await AsyncStorage.getItem(storageKey);

        const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

        const payload = JSON.stringify(
          cachedApplications.filter((cachedChainID) => cachedChainID !== chainID)
        );

        updatedApplications = await AsyncStorage.setItem(storageKey, payload);

        setStatus('idle');

        return updatedApplications;
      } catch (_error) {
        setError(_error);

        setStatus('idle');

        return updatedApplications;
      }
    },
    [storageKey]
  );

  return {
    status,
    error,
    getApplications,
    addApplication,
    deleteApplication,
  };
}
