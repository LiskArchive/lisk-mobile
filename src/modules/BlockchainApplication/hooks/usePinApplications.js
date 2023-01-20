import { useCallback } from 'react';

import { useApplications } from '../context/ApplicationsContext';
// import { useApplicationsStorage } from './useApplicationsStorage';
// import { PINNED_APPLICATIONS_STORAGE_KEY } from '../constants';

/**
 * Hook that handle all the logic related to pinning blockchain
 * applications. This enables components/hooks to use pin logic
 * from one single place. Allows user to add/remove a pin by chain ID.
 *
 * @returns {Object} - The pinned applications chain IDs, a toggle pin handler
 * and a handler for checking pinned application by chain ID.
 */
export function usePinApplications() {
  const { pins, dispatchPins } = useApplications();

  // const { addApplication: addPinToStorage, deleteApplication: deletePinFromStorage } =
  //   useApplicationsStorage(PINNED_APPLICATIONS_STORAGE_KEY);

  const checkPin = useCallback((chainID) => pins.data?.includes(chainID), [pins.data]);

  const togglePin = useCallback(
    async (chainID) => {
      if (!checkPin(chainID)) {
        // await addPinToStorage(chainID);

        dispatchPins({ type: 'add', chainID });
      } else {
        // await deletePinFromStorage(chainID);

        dispatchPins({ type: 'delete', chainID });
      }
    },
    [
      // addPinToStorage,
      checkPin,
      // deletePinFromStorage,
      dispatchPins,
    ]
  );

  return { pins, togglePin, checkPin };
}
