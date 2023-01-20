import { useCallback, useEffect } from 'react';

import { useApplications } from '../context/ApplicationsContext';
import { usePinsLocalStorage } from './usePinsLocalStorage';

/**
 * Hook that handle all the logic related to pinning blockchain
 * applications. This enables components/hooks to use pin logic
 * from one single place. Allows user to add/remove a pin by chain ID.
 *
 * @returns {Object} - The pinned applications chain IDs, a toggle pin handler
 * and a handler for checking pinned application by chain ID.
 */
export function usePinApplications() {
  const { pins } = useApplications();

  const {
    getPins: getPinsFromStorage,
    addPin: addPinToStorage,
    deletePin: deletePinFromStorage,
    status: pinsStorageStatus,
    error: errorOnPinsStorage,
  } = usePinsLocalStorage();

  const checkPin = useCallback((chainID) => pins.data?.includes(chainID), [pins.data]);

  const togglePin = useCallback(
    async (chainID) => {
      if (!checkPin(chainID)) {
        await addPinToStorage(chainID);

        pins.dispatchData({ type: 'add', chainID });
      } else {
        await deletePinFromStorage(chainID);

        pins.dispatchData({ type: 'delete', chainID });
      }
    },
    [addPinToStorage, checkPin, deletePinFromStorage, pins]
  );

  useEffect(() => {
    if (!pins.data) {
      getPinsFromStorage().then((cachedPins) => {
        pins.dispatchData({ type: 'init', pins: cachedPins || [] });
      });
    }
  }, [pins, getPinsFromStorage]);

  useEffect(() => {
    pins.setStatus(pinsStorageStatus);
  }, [pinsStorageStatus, pins]);
  useEffect(() => {
    pins.setError(errorOnPinsStorage);
  }, [errorOnPinsStorage, pins]);

  return { pins, togglePin, checkPin };
}
