import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Fetch list of tokens available for a given user account.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @param {Object} client - Custom API client for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useAccountTokensQuery(
  address,
  { config: customConfig = {}, options = {}, client } = {}
) {
  const config = {
    url: `${API_URL}/tokens`,
    method: 'get',
    event: 'get.tokens',
    ...customConfig,
    params: {
      address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_QUERY, address, config]);

  return useCustomInfiniteQuery({ config, options, keys, client });
}
