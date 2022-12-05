import { useMemo } from 'react';

import { useApplicationsQuery } from '../api/useApplicationsQuery';
import { useApplicationsMetaQuery } from '../api/useApplicationsMetaQuery';

/**
 * Hook that handle all the logic related to blockchain applications explorer.
 * @returns {Object} Available blockchain applications on and off-chain data.
 */
export function useApplicationsExplorer({
  applicationsConfig = {},
  applicationsMetaConfig = {},
  applicationsOptions = {},
  applicationsMetaOptions = {},
} = {}) {
  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
  } = useApplicationsQuery({
    config: applicationsConfig,
    options: applicationsOptions,
  });

  const {
    data: applicationsMetaData,
    isLoading: isLoadingApplicationsMeta,
    isError: isErrorOnApplicationsMeta,
    error: errorOnApplicationsMeta,
  } = useApplicationsMetaQuery({
    options: {
      enabled: !!applicationsData?.data,
      ...applicationsMetaOptions,
    },
    config: {
      params: {
        // TODO: Pass as CSV of chainIDs when backend supports feature.
        // e.g.: applicationsData?.data.map((app) => app.chainID)
        chainID: applicationsData?.data[0]?.chainID,
        ...applicationsMetaConfig?.params,
      },
      ...applicationsMetaConfig,
    },
  });

  const isLoading = isLoadingApplications || isLoadingApplicationsMeta;
  const isError = isErrorOnApplications || isErrorOnApplicationsMeta;
  const error = errorOnApplications || errorOnApplicationsMeta;

  const data = useMemo(() => {
    if (!applicationsMetaData?.data || !applicationsData?.data) {
      return undefined;
    }

    return applicationsMetaData.data;
  }, [applicationsData?.data, applicationsMetaData?.data]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
