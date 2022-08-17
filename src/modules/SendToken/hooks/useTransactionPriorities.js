import { useMemo } from 'react';
import { useGetFeesByPriorityQuery } from '../api/useGetFeesByPriorityQuery';

export default function useTransactionPriorities() {
  const feesByPriorityQuery = useGetFeesByPriorityQuery();

  const data = useMemo(() => {
    if (feesByPriorityQuery.data) {
      return Object.entries(feesByPriorityQuery.data).map(
        ([priorityCode, priorityBaseFee]) => (
          {
            code: priorityCode,
            fee: priorityBaseFee,
          }
        )
      );
    }
    return [];
  }, [feesByPriorityQuery.data]);

  return {
    ...feesByPriorityQuery,
    data
  };
}
