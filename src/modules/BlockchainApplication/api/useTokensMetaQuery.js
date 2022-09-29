import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { GET_TOKENS_METADATA_QUERY } from 'utilities/api/queries';
import { LIMIT, API_URL, API_BASE_URL, NETWORK } from 'utilities/api/constants';

/**
 * Fetch list of blockchain applications tokens on-chain metadata.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useTokensMetaQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/blockchain/apps/meta/tokens`,
    method: 'get',
    event: 'get.tokens.meta',
    ...customConfig,
    params: { network: NETWORK, limit: LIMIT, ...customConfig.params },
  };

  const keys = [GET_TOKENS_METADATA_QUERY];

  const query = useCustomInfiniteQuery({ config, options, keys });

  return query;
}
