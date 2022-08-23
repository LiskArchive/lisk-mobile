import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ApiClient from 'utilities/api/lisk/apiClient';

export function useGetFeesByPriorityQuery() {
  const query = useQuery(['priorityFees'], () => ApiClient.getFees());

  const result = useMemo(() => {
    return query.data?.data?.feeEstimatePerByte;
  }, [query.data]);

  return {
    ...query,
    data: result,
    isError: !!query.error,
  };
}
