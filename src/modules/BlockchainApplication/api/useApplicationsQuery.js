import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { GET_APPLICATION_QUERY } from 'utilities/api/queries';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { useQueryKeys } from '../../../utilities/api/hooks/useQueryKeys';

/**
 * Fetch list of blockchain applications on-chain data.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (applications), loading state, error state, and more.
 */
export function useApplicationsQuery(chainID, { config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/blockchain/apps`,
    method: 'get',
    event: 'get.blockchain.apps',
    ...customConfig,
    params: { chainID, limit: LIMIT, ...customConfig.params },
  };

  const keys = useQueryKeys([GET_APPLICATION_QUERY, config]);

  return useCustomInfiniteQuery({ config, options, keys });
}
