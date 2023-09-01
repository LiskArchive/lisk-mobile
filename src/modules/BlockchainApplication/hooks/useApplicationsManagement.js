import { useCallback } from 'react';
import i18next from 'i18next';

import DropDownHolder from 'utilities/alert';
import { useApplications } from '../context/ApplicationsContext';
import { usePinApplications } from './usePinApplications';
import { useApplicationsLocalStorage } from './useApplicationsLocalStorage';
import { isMainchainApplication } from '../utils';
import { useCurrentApplication } from './useCurrentApplication';

/**
 * Provides an API to add, delete and read the blockchain applications saved by the user.
 * @returns {Object} - Applications (data, loading and error states), addApplication
 * callback and deleteApplication callback.
 */
export function useApplicationsManagement() {
  const { applications } = useApplications();

  const { checkPin, togglePin } = usePinApplications();

  const [, setCurrentApplication] = useCurrentApplication();

  const defaultApplication = applications.data.find((app) => app.chainName === 'lisk_mainchain');

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

        setCurrentApplication(defaultApplication);

        togglePin(chainID);
      } catch (_error) {
        DropDownHolder.error(
          i18next.t('Error'),
          'Error deleting application. Please try again later.'
        );
      }
    },
    [
      deleteApplicationFromStorage,
      applications,
      togglePin,
      setCurrentApplication,
      defaultApplication,
    ]
  );

  // sort by mainchain and pinned applications
  const data = applications?.data?.sort((appI, appJ) => {
    const isIMainchain = isMainchainApplication(appI.chainID);
    const isJMainchain = isMainchainApplication(appJ.chainID);
    const isIPinned = checkPin(appI.chainID);
    const isJPinned = checkPin(appJ.chainID);

    return isJMainchain - isIMainchain || isJPinned - isIPinned;
  });

  return {
    applications: { ...applications, data },
    addApplication,
    deleteApplication,
  };
}
