import { useMemo } from 'react';

import { useApplicationsQuery } from '../api/useApplicationsQuery';
import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';
import { usePinBlockchainApplication } from './usePinBlockchainApplication';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications array.
 */
export function useBlockchainApplicationExplorer() {
  const applicationsQuery = useApplicationsQuery();
  const applicationsMetaQuery = useApplicationsMetaQuery();

  const { pins, checkPinByChainId } = usePinBlockchainApplication();

  const applications = useMemo(() => {
    const data = applicationsQuery.data?.data.map((app) => ({
      ...app,
      isPinned: checkPinByChainId(app.chainID),
    }));

    return { ...applicationsQuery, data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationsQuery, pins, checkPinByChainId]);

  const applicationsMetadata = useMemo(() => {
    const data = applicationsMetaQuery.data?.data.map((app) => ({
      ...app,
      isPinned: checkPinByChainId(app.chainID),
    }));

    return { ...applicationsMetaQuery, data };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationsMetaQuery, pins, checkPinByChainId]);

  return {
    applications,
    applicationsMetadata
  };
}
