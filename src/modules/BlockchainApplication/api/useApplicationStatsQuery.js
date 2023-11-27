import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_APPLICATION_STATS } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import liskAPIClient from 'utilities/api/LiskAPIClient';

export function useApplicationStatsQuery() {
  const config = {
    url: `${API_URL}/blockchain/apps/statistics`,
    method: 'GET',
  };

  const keys = useQueryKeys([GET_APPLICATION_STATS, config]);

  return useCustomQuery({
    keys,
    config,
    client: liskAPIClient,
  });
}
