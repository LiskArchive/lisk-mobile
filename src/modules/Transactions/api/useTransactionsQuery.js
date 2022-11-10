import { LIMIT, API_URL } from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY } from 'utilities/api/queries';
import { useCustomInfiniteQuery } from 'utilities/api/hooks/useCustomInfiniteQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';

export function useTransactionsQueryParams({ config: customConfig = {} } = {}) {
  const config = {
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_TRANSACTIONS_QUERY, config]);

  return { config, keys };
}

/**
 * Fetch user account transactions in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query hook to perform the API call.
 */
export function useTransactionsQuery({ config: customConfig = {}, options = {} } = {}) {
  const { config, keys } = useTransactionsQueryParams({ config: customConfig });

  return useCustomInfiniteQuery({ config, options, keys });
}
