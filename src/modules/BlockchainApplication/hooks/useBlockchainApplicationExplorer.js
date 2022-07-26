import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetApplicationsMetaQuery } from '../api/useGetApplicationsQuery';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';
import { selectApplications as selectApplicationsSelector } from '../store/selectors';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications array.
 */
export function useBlockchainApplicationExplorer() {
  const applicationsState = useSelector(selectApplicationsSelector);

  const getApplicationsMetaQuery = useGetApplicationsMetaQuery();

  const { pins, checkPinByChainId } = usePinBlockchainApplication();

  const applications = useMemo(() => {
    const data = Object.values(applicationsState).map((app) => ({
      ...app,
      isPinned: checkPinByChainId(app.chainID),
    }));

    return { ...getApplicationsMetaQuery, data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getApplicationsMetaQuery, pins, applicationsState, checkPinByChainId]);

  return {
    applications,
  };
}
