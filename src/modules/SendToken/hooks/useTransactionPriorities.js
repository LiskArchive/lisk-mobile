import { useMemo } from 'react';

import { useTransactionFeesQuery } from 'modules/Transactions/api/useTransactionFeesQuery';

export default function useTransactionPriorities() {
  const { data: transactionFeesData, ...transactionFeesQuery } = useTransactionFeesQuery();

  const data = useMemo(() => {
    if (transactionFeesData?.data) {
      const feeEstimatedPerByte = transactionFeesData.data.feeEstimatePerByte;

      return Object.entries(feeEstimatedPerByte).map(([priorityCode, priorityBaseFee]) => ({
        code: priorityCode,
        fee: priorityBaseFee,
      }));
    }
    return [];
  }, [transactionFeesData?.data]);

  return {
    ...transactionFeesQuery,
    data,
  };
}
