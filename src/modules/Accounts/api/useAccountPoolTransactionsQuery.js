import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_ACCOUNT_POOL_TRANSACTIONS_QUERY } from 'utilities/api/queries';

/**
 * Fetch the transactions in 'pending' status for a given account.
 * @param {String} address - Address of the account to query the transactions from.
 * @param {String} moduleCommand - Module-command of the transactions to query from.
 * @param {String} configs - Custom configurations for the query (optional).
 * @param {Object} configs.config - Custom config for the query.
 * @param {Object} configs.options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useAccountPoolTransactionsQuery(
  address,
  moduleCommand,
  { config: customConfig = {}, options = {} } = {}
) {
  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      address,
      moduleCommand,
      executionStatus: 'pending',
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_ACCOUNT_POOL_TRANSACTIONS_QUERY, address, config]);

  return useCustomInfiniteQuery({ config, options, keys });
}
