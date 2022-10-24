import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { GET_APPLICATION_STATS } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';
import { useQueryKeys } from '../../../utilities/api/hooks/useQueryKeys';

export function useBlockchainApplicationStats() {
  const config = {
    url: `${API_URL}/blockchain/apps/statistics`,
    method: 'get',
  };

  const keys = useQueryKeys([GET_APPLICATION_STATS, config]);

  return useCustomQuery({
    keys,
    config,
  });
}
