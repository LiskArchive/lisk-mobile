import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { GET_TRANSACTION_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';

/**
 * Fetch a transaction based on provided ID.
 * Executes the API call once the hook is mounted.
 * @param {String} id - ID of the transaction to be fetched.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query hook to perform the API call.
 */
export function useTransactionQuery(id, { config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/transactions`,
    method: 'GET',
    event: 'get.transaction',
    ...customConfig,
    params: {
      transactionID: id,
      ...(customConfig?.params || {}),
    },
  };

  const keys = useQueryKeys([GET_TRANSACTION_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options,
  });
}
