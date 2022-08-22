import {
  METHOD,
  LIMIT,
  API_VERSION,
  API_BASE_URL
} from 'utilities/api/constants';
import { GET_TRANSACTIONS_QUERY } from 'utilities/api/queries';
import { useCustomInfiniteQuery } from '../../../utilities/api/hooks/useCustomInfiniteQuery';

/**
 * Fetch user account transactions in paginated mode.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data
 * (with the array of transactions), loading state, error state, and more.
 */
export function useGetTransactionsQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    baseURL: API_BASE_URL,
    url: `/api/${API_VERSION}/transactions`,
    method: 'get',
    event: 'get.transactions',
    ...customConfig,
    params: {
      limit: LIMIT,
      ...(customConfig?.params || {})
    },
  };

  const keys = [GET_TRANSACTIONS_QUERY, METHOD, config];

  const query = useCustomInfiniteQuery({ config, options, keys });

  return query;
}
