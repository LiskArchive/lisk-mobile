import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TOKENS_QUERY } from 'utilities/api/queries';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Fetch list of tokens available for a given user address.
 * Executes the API call once the hook is mounted.
 * @param {String} address - Address of the account to query the tokens from.
 * @param {String} configs - Custom configurations for the query (optional).
 * @param {Object} configs.config - Custom config for the query.
 * @param {Object} configs.options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (tokens), loading state, error state, and more.
 */
export function useAccountTokensQuery(address, { config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/token/balances`,
    method: 'GET',
    event: 'get.token.balances',
    ...customConfig,
    params: {
      address,
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_QUERY, address, config]);

  return useCustomInfiniteQuery({ config, options, keys });
}
