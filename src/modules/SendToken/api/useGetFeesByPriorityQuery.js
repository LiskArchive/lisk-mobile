import { useMemo } from 'react';
import { useCustomQuery } from 'utilities/api/hooks/useCustomQuery';
import {
  API_URL
} from 'utilities/api/constants';

export function useGetFeesByPriorityQuery() {
  const query = useCustomQuery({
    keys: ['priorityFees'],
    config: {
      url: `${API_URL}/fees`,
      method: 'get',
    }
  });

  const result = useMemo(() => {
    return query.data?.data?.feeEstimatePerByte;
  }, [query.data]);

  return {
    ...query,
    data: result,
    isError: !!query.error,
  };
}
