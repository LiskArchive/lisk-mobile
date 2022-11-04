import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { GET_TRANSACTION_FEE_ESTIMATE_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';

/**
 * Fetch the current dynamic fee recommendations and other network fee constant information.
 * @param {Object} config - Custom configurations for the query.
 * @param {Object} options - Custom options for the query.
 * @returns - The query hook to perform the API call.
 */
export function useTransactionFeeEstimateQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
    event: 'get.fees',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_TRANSACTION_FEE_ESTIMATE_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options,
  });
}
