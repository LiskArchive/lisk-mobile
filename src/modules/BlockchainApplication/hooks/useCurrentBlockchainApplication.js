import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentApplication } from '../store/selectors';
import { setCurrentApplication } from '../store/actions';

/**
 * Hook that manages the blockchain application currently logged in
 * by the user.
 *
 * @returns {Array} - Containing (1) Current blockchain application
 * in use and (2) the corresponding handler to set that application.
 */
export function useCurrentBlockchainApplication() {
  const dispatch = useDispatch();

  const currentApplication = useSelector(selectCurrentApplication);

  const setApplication = useCallback(
    (application) => dispatch(setCurrentApplication(application)),
    [],
  );

  return [currentApplication, setApplication];
}
