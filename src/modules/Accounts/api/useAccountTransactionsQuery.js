import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_TRANSACTIONS_QUERY } from 'utilities/api/queries';

/**
 * Fetch user account transactions in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {String} address - Address of the account to query the transactions from.
 * @param {String} configs - Custom configurations for the query (optional).
 * @param {Object} configs.config - Custom config for the query.
 * @param {Object} configs.options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useAccountTransactionsQuery(
  address,
  { config: customConfig = {}, options = {} } = {}
) {
  const config = {
    url: `${API_URL}/transactions`,
    method: 'GET',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      address,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_ACCOUNT_TRANSACTIONS_QUERY, address, config]);

  return useCustomInfiniteQuery({ config, options, keys });
}
