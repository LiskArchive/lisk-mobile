import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { GET_TRANSACTION_FEE_ESTIMATE_QUERY } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';

export function useTransactionFeeEstimateQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
    event: 'get.transaction.feeEstimate',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_TRANSACTION_FEE_ESTIMATE_QUERY, config]);

  return useCustomQuery({
    keys,
    config,
    options,
  });
}
