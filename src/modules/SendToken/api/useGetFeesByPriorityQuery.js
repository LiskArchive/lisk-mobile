import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ApiClient from 'utilities/api/lisk/apiClient';

export function useGetFeesByPriorityQuery() {
  const {
    isLoading, error, data, refetch
  } = useQuery(['priorityFees'], () => ApiClient.getFees());

  const result = useMemo(() => {
    return data?.data?.feeEstimatePerByte;
  }, [data]);

  return {
    data: result,
    isLoading,
    error,
    isError: !!error,
    refetch,
  };
}
