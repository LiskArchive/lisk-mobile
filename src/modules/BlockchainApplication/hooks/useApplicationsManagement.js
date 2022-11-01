import { useCallback } from 'react';
import { useApplications } from '../context/ApplicationsContext';
import { useApplicationsAsyncStorage } from './useApplicationsAsyncStorage';

/**
 * Provides an API to add, delete and read the blockchain applications saved by the user.
 * @returns {Object} applications (data, loading and error states), addApplication callback
 * and deleteApplication callback.
 */
export function useApplicationsManagement() {
  const { applications, dispatchApplications } = useApplications();

  const {
    addApplication: addApplicationToStorage,
    deleteApplication: deleteApplicationFromStorage,
  } = useApplicationsAsyncStorage();

  const addApplication = useCallback(
    (application) =>
      addApplicationToStorage(application.chainID).then(() =>
        dispatchApplications({ type: 'add', application })
      ),
    [addApplicationToStorage, dispatchApplications]
  );

  const deleteApplication = useCallback(
    (chainID) =>
      deleteApplicationFromStorage(chainID).then(() =>
        dispatchApplications({ type: 'delete', chainID })
      ),
    [deleteApplicationFromStorage, dispatchApplications]
  );

  return {
    applications,
    addApplication,
    deleteApplication,
  };
}
