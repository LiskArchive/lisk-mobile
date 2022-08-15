import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ApiClient from 'utilities/api/lisk/apiClient';

export function useGetFeesByPriorityQuery() {
  const {
    isLoading, error, data: { data }, refetch
  } = useQuery(['priorityFees'], () => ApiClient.getFees());

  const result = useMemo(() => {
    return data?.feeEstimatePerByte;
  }, [data]);

  return {
    data: { low: 0.005, medium: 0.007, high: 0.01 },
    isLoading,
    error,
    isError: !!error,
    refetch,
  };
}
