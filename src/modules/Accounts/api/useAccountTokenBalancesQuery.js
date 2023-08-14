import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { GET_ACCOUNT_TOKENS_BALANCES_QUERY } from 'utilities/api/queries';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

/**
 * Fetch the tokens balances of a given account.
 * @param {String} address - Address of the account to fetch the balance from.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (balances), loading state, error state, and more.
 */
export function useAccountTokenBalancesQuery(
  address,
  { config: customConfig = {}, options = {} } = {}
) {
  const config = {
    url: `${API_URL}/token/balances`,
    method: 'GET',
    event: 'get.token.balances',
    ...customConfig,
    params: {
      limit: LIMIT,
      address,
      ...customConfig.params,
    },
  };

  const keys = useQueryKeys([GET_ACCOUNT_TOKENS_BALANCES_QUERY, address]);

  return useCustomInfiniteQuery({ config, options, keys });
}
