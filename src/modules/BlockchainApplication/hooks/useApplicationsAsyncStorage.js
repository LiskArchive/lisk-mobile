/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { APPLICATIONS_STORAGE_KEY } from '../constants';

export function useApplicationsAsyncStorage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();

  // AsyncStorage.removeItem(APPLICATIONS_STORAGE_KEY);

  const getApplications = useCallback(async () => {
    let applications;

    setStatus('initializing');

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

      setStatus('idle');

      applications = cachedApplicationsJSON != null ? JSON.parse(cachedApplicationsJSON) : null;

      return applications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return applications;
    }
  }, []);

  const addApplication = useCallback(async (chainID) => {
    setStatus('adding');

    let updatedApplications;

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

      const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

      const payload = JSON.stringify([...cachedApplications, chainID]);

      updatedApplications = await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, payload);

      setStatus('idle');

      return updatedApplications;
    } catch (_error) {
      setError(_error);

      setStatus('idle');

      return updatedApplications;
    }
  }, []);

  const deleteApplication = useCallback(async (chainID) => {
    setStatus('deleting');

    let updatedApplications;

    try {
      const cachedApplicationsJSON = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);

      const cachedApplications = cachedApplicationsJSON ? JSON.parse(cachedApplicationsJSON) : [];

      const payload = JSON.stringify(
        cachedApplications.filter((cachedChainID) => cachedChainID !== chainID)
      );

      updatedApplications = await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, payload);

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
    getApplications,
    addApplication,
    deleteApplication,
  };
}
