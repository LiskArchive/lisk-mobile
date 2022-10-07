import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import { useQueryKeys } from 'utilities/api/hooks/useQueryKeys';
import { GET_TRANSACTION_FEES } from 'utilities/api/queries';
import { API_URL } from 'utilities/api/constants';

export function useTransactionFeesQuery({ config: customConfig = {}, options = {} } = {}) {
  const config = {
    url: `${API_URL}/fees`,
    method: 'get',
    event: 'get.transactions.fees',
    ...customConfig,
  };

  const keys = useQueryKeys([GET_TRANSACTION_FEES, config]);

  return useCustomQuery({
    keys,
    config,
    options,
  });
}
