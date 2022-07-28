/* eslint-disable max-statements */
import { useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addApplication as addApplicationAction,
  deleteApplicationByChainId as deleteApplicationAction,
} from '../store/actions';
import { useCurrentBlockchainApplication } from './useCurrentBlockchainApplication';
import { BLOCKCHAIN_APPLICATIONS_MOCK, DEFAULT_BLOCKCHAIN_APPLICATION } from '../mocks';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';
import { selectApplications as selectApplicationsSelector } from '../store/selectors';

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

  const applicationsState = useSelector(selectApplicationsSelector);

  const { pins, checkPinByChainId } = usePinBlockchainApplication();

  const [currentApplication, setCurrentApplication] = useCurrentBlockchainApplication();

  const applications = useMemo(() => {
    console.log('recalculating...');
    const data = Object.values(applicationsState)
      .map((app) => ({
        ...app,
        isPinned: checkPinByChainId(app.chainID),
      }))
      .sort((a) => (a.isPinned ? -1 : 1));

    return { data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins, applicationsState, checkPinByChainId]);

  console.log({ applicationsState, applications });

  const addApplication = useCallback(
    (application) => {
      if (application.isDefault) return;

      dispatch(addApplicationAction(application));
    },
    [dispatch]
  );

  const getApplicationByChainId = useCallback(
    (chainId) => applications.data.find((app) => app.chainID === chainId),
    [applications.data]
  );

  const deleteApplicationByChainId = useCallback(
    (chainId) => {
      dispatch(deleteApplicationAction(chainId));

      if (currentApplication && currentApplication.chainID === chainId) {
        // Set Lisk as default if application in use is being deleted.
        setCurrentApplication(BLOCKCHAIN_APPLICATIONS_MOCK[0]);
      }
    },
    [currentApplication, dispatch, setCurrentApplication]
  );

  useEffect(() => {
    if (Object.keys(applicationsState).length === 0)
      dispatch(addApplicationAction([DEFAULT_BLOCKCHAIN_APPLICATION]));
  }, [applicationsState, dispatch]);

  return {
    applications,
    addApplication,
    getApplicationByChainId,
    deleteApplicationByChainId,
  };
}
