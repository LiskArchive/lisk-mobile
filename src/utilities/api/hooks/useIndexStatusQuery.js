import { API_URL, METHOD } from 'utilities/api/constants';
import { GET_INDEX_STATUS_QUERY } from 'utilities/api/queries';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import liskAPIClient from 'utilities/api/LiskAPIClient';
import { useMemo } from 'react';

export function useIndexStatusQuery() {
  const config = {
    url: `${API_URL}/index/status`,
    method: 'GET',
    event: 'get.index.status',
  };

  const keys = [GET_INDEX_STATUS_QUERY, config, METHOD];

  const options = {
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
  };

  const query = useCustomQuery({ config, keys, options, client: liskAPIClient });

  const isLoading = useMemo(
    () => query.isLoading || query.data?.data.isIndexingInProgress,
    [query.isLoading, query.data?.data.isIndexingInProgress]
  );

  return { ...query, isLoading };
}
