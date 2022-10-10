import { useMemo } from 'react';

import { useTransactionFeeEstimateQuery } from 'modules/Transactions/api/useTransactionFeeEstimateQuery';

export default function useTransactionPriorities() {
  const { data: transactionFeesData, ...transactionFeesQuery } = useTransactionFeeEstimateQuery();
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
