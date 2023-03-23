import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_TRANSACTION_POOL_QUERY } from 'utilities/api/queries';

/**
 * Fetch the transactions in 'pending' execution status.
 * @param {object} configs - Custom configurations for the query (optional).
 * @param {object} configs.config - Custom config for the query.
 * @param {object} configs.options - Custom options for the query.
 * @returns {QueryResult} - The query result.
 */
export function useTransactionPoolQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      executionStatus: 'pending',
      ...customConfig.params,
    },
  };

  const keys = useQueryKeys([GET_TRANSACTION_POOL_QUERY, config]);

  return useCustomInfiniteQuery({ config, options, keys });
}
