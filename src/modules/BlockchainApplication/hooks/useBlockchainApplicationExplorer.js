import { useMemo } from 'react';

import { useGetApplicationsMetaQuery } from '../api/useGetApplicationsQuery';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications array.
 */
export function useBlockchainApplicationExplorer() {
  const getApplicationsMetaQuery = useGetApplicationsMetaQuery();

  const { pins, checkPinByChainId } = usePinBlockchainApplication();

  const applications = useMemo(() => {
    const data = getApplicationsMetaQuery.data?.map((app) => ({
      ...app,
      isPinned: checkPinByChainId(app.chainID),
    }));

    return { ...getApplicationsMetaQuery, data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getApplicationsMetaQuery, pins, checkPinByChainId]);

  return {
    applications,
  };
}
