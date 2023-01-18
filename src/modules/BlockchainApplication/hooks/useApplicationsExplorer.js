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
    data: applicationsMetaData,
    isLoading: isLoadingApplicationsMeta,
    isSuccess: isSuccessApplicationsMeta,
    isError: isErrorOnApplicationsMeta,
    error: errorOnApplicationsMeta,
    refetch: refetchApplicationsMetaQuery,
  } = useApplicationsMetaQuery({
    config: applicationsMetaConfig,
    options: applicationsMetaOptions,
  });

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isSuccess: isSuccessApplications,
    isError: isErrorOnApplications,
    error: errorOnApplications,
    refetch: refetchApplicationsQuery,
  } = useApplicationsQuery({
    options: {
      enabled: !!applicationsMetaData?.data,
      ...applicationsOptions,
    },
    config: {
      params: {
        // TODO: Pass as CSV of chainIDs when backend supports feature.
        // e.g.: applicationsData?.data.map((app) => app.chainID)
        chainID: applicationsMetaData?.data[0]?.chainID,
        ...applicationsConfig?.params,
      },
      ...applicationsConfig,
    },
  });

  const isLoading = isLoadingApplicationsMeta || isLoadingApplications;
  const isSuccess = isSuccessApplicationsMeta && isSuccessApplications;
  const isError = isErrorOnApplicationsMeta || isErrorOnApplications;
  const error = errorOnApplicationsMeta || errorOnApplications;

  const data = useMemo(() => {
    if (!applicationsMetaData?.data || !applicationsData?.data) {
      return undefined;
    }

    return applicationsMetaData.data;
  }, [applicationsData?.data, applicationsMetaData?.data]);

  const refetch = () => {
    refetchApplicationsQuery();

    refetchApplicationsMetaQuery();
  };

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
