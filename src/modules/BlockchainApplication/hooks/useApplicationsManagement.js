import { useCallback } from 'react';
import i18next from 'i18next';

import DropDownHolder from 'utilities/alert';
import { useApplications } from '../context/ApplicationsContext';
import { useApplicationsLocalStorage } from './useApplicationsLocalStorage';

/**
 * Provides an API to add, delete and read the blockchain applications saved by the user.
 * @returns {Object} - Applications (data, loading and error states), addApplication
 * callback and deleteApplication callback.
 */
export function useApplicationsManagement() {
  const { applications } = useApplications();

  const {
    addApplication: addApplicationToStorage,
    deleteApplication: deleteApplicationFromStorage,
  } = useApplicationsLocalStorage();

  const addApplication = useCallback(
    async (application, options) => {
      try {
        await addApplicationToStorage(application.chainID);

        applications.dispatchData({ type: 'add', application });

        options?.onSuccess();
      } catch (_error) {
        options?.onError(_error);
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

  return {
    applications,
    addApplication,
    deleteApplication,
  };
}
