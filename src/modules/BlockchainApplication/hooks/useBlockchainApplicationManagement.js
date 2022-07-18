import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addApplicationByChainId as addApplicationAction,
  deleteApplicationByChainId as deleteApplicationAction
} from '../store/actions';
import { selectApplications } from '../store/selectors';
import { useCurrentBlockchainApplication } from './useCurrentBlockchainApplication';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';
import { BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks';

/**
 * Hook that handle all the logic related to blockchain applications management.
 * Enables the component/hooks to use applications logic from one single place.
 *
 * @returns {Object} - Available blockchain applications array, a set
 * application handler, get application by chain ID handler and  a delete
 * application by ID handler.
 */
export function useBlockchainApplicationManagement() {
  const dispatch = useDispatch();

  const [currentApplication, setCurrentApplication] = useCurrentBlockchainApplication();

  const { checkPinByChainId } = usePinBlockchainApplication();

  const applicationsObject = useSelector(selectApplications);

  const applications = useMemo(
    () => {
      const appsList = Object.values(applicationsObject);

      return [...BLOCKCHAIN_APPLICATIONS_MOCK, ...appsList].map((app) => ({
        ...app,
        isPinned: checkPinByChainId(app.chainID),
      })).sort((a) => (a.isPinned ? -1 : 1));
    },
    [applicationsObject, BLOCKCHAIN_APPLICATIONS_MOCK],
  );

  const addApplicationByChainId = useCallback(
    (application) => {
      if (application.isDefault) return;

      dispatch(addApplicationAction(application));
    },
    [],
  );

  const getApplicationByChainId = useCallback(
    (chainId) => applications.find((app) => app.chainID === chainId),
    [applications],
  );

  const deleteApplicationByChainId = useCallback(
    (chainId) => {
      dispatch(deleteApplicationAction(chainId));

      if (currentApplication && currentApplication.chainID === chainId) {
        // Set Lisk as default if application in use is being deleted.
        setCurrentApplication(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
      }
    },
    [],
  );

  return {
    applications,
    addApplicationByChainId,
    getApplicationByChainId,
    deleteApplicationByChainId,
  };
}
