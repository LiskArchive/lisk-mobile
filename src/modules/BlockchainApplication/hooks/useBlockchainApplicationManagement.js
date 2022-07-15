import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addApplication, deleteApplication } from '../store/actions';
import { selectApplications } from '../store/selectors';
import { useCurrentBlockchainApplication } from './useCurrentBlockchainApplication';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';
import { APPLICATIONS_MOCK } from '../mocks';

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

  const [currentApplication,
    setCurrentApplication] = useCurrentBlockchainApplication();

  const { checkPinByChainId } = usePinBlockchainApplication();

  const applicationsObject = useSelector(selectApplications);

  const applications = useMemo(
    () => {
      const appsList = Object.values(applicationsObject);

      return [...APPLICATIONS_MOCK, ...appsList].map((app) => ({
        ...app,
        isPinned: checkPinByChainId(app.chainID),
      })).sort((a) => (a.isPinned ? -1 : 1));
    },
    [applicationsObject, APPLICATIONS_MOCK],
  );

  const setApplication = useCallback(
    (application) => {
      if (application.isDefault) return;

      dispatch(addApplication(application));
    },
    [],
  );

  const getApplicationByChainId = useCallback(
    (chainId) => applications.find((app) => app.chainID === chainId),
    [applications],
  );

  const deleteApplicationByChainId = useCallback(
    (chainId) => {
      dispatch(deleteApplication(chainId));

      if (currentApplication.chainID === chainId) {
        // Set Lisk as default if application in use is being deleted
        setCurrentApplication(APPLICATIONS_MOCK[0]);
      }
    },
    [],
  );

  return {
    applications,
    setApplication,
    getApplicationByChainId,
    deleteApplicationByChainId,
  };
}
