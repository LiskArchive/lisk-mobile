import { useQuery } from '@tanstack/react-query';

import { GET_TRANSACTION_QUERY } from 'utilities/api/queries';
import {
  API_METHOD,
  METHOD,
  API_URL,
  API_BASE_URL
} from 'utilities/api/constants';

/**
 * Fetch a transaction based on provided ID.
 * Executes the API call once the hook is mounted.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query state of the API call. Includes the data,
 * loading state, error state, and more.
 */
export function useGetTransactionQuery(id, { config: customConfig = {}, options = {} } = {}) {
  const config = {
    baseURL: API_BASE_URL,
    url: `${API_URL}/transactions`,
    method: 'get',
    event: 'get.transaction',
    ...customConfig,
    params: {
      transactionID: id,
      ...(customConfig?.params || {})
    },
  };

  const keys = [GET_TRANSACTION_QUERY, METHOD, config];

  const query = useQuery(
    keys,
    async () => API_METHOD[METHOD](config),
    options
  );

  return query;
}
